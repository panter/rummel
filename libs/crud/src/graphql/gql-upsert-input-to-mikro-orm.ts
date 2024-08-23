import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { isArray, isFunction, isNil } from 'lodash';
import {
  applyCreateOneResolver,
  applyStaticInputFieldResolver,
  applyUpdateOneResolver,
  CrudInfo,
  getCrudInfosForType,
} from './utils';
import { AuthenticatedUser } from './types';

export const gqlUpsertKeyInputToOrm = async <
  Input extends { [key: string | number | symbol]: any },
>(
  gqlInput: Input,
  ormData: any,
  key: string | number | symbol,
  type: Type<any>,
  {
    em,
    currentUser,
    currentOrmData,
    rootOrmData,
    skipInputResolver,
  }: {
    em: EntityManager;
    currentUser?: AuthenticatedUser | null;
    currentOrmData?: any;
    rootOrmData?: any;
    skipInputResolver?: boolean;
  },
) => {
  const crudInfos = getCrudInfosForType(type);
  const crudInfo = crudInfos.find((p) => p.name === key);
  const nestedKeys = gqlInput[key] ? Object.keys(gqlInput[key]) : [];
  let newType;
  try {
    if (!crudInfo) {
      throw new Error(`No crud info found for ${key.toString()}`);
    }
    newType = crudInfo?.typeFn();
  } catch (e) {
    console.error(e);
  }
  if (!crudInfo) {
    console.error(`No crud info found for ${key.toString()}`);
    return;
  }

  // TODO: this should be in the crud info
  let isRelation: boolean;
  try {
    const typeCrud = getCrudInfosForType(newType as any);
    isRelation = Boolean(typeCrud?.length);
  } catch (e) {
    isRelation = false;
  }

  const inputResolver = crudInfo?.crudOptions?.inputResolver;
  if (crudInfo && isFunction(inputResolver) && !skipInputResolver) {
    await inputResolver(ormData, gqlInput, {
      em,
      key,
      currentOrmData,
      rootOrmData,
      currentUser,
      crudInfo,
      type,
      skipInputResolver,
    });
  } else if (nestedKeys.indexOf('set') >= 0) {
    const inputValue = gqlInput[key].set;
    ormData[key] = inputValue != undefined ? inputValue : undefined;
  } else if (
    isRelation ||
    nestedKeys.indexOf('disconnect') >= 0 ||
    nestedKeys.indexOf('connect') >= 0 ||
    nestedKeys.indexOf('create') >= 0 ||
    nestedKeys.indexOf('update') >= 0
  ) {
    await upsertMany(
      gqlInput,
      key,
      ormData,
      crudInfo,
      isArray(newType) ? newType[0] : newType,
      {
        em,
        currentOrmData,
        currentUser,
        rootOrmData,
      },
    );
  } else if (gqlInput[key] !== undefined) {
    if (gqlInput[key]?.constructor === Object) {
      ormData[key] =
        Object.keys(gqlInput[key])?.length > 0 ? gqlInput[key] : undefined;
    } else {
      ormData[key] = gqlInput[key];
    }
  }

  return ormData;
};

// TODO: use schema info from the crudInfos to get relation types
export const gqlUpsertInputToOrm = async <Entity, Input extends object>(
  gqlInput: Input,
  type: Type<Entity>,
  {
    em,
    currentUser,
    currentOrmData,
    rootOrmData,
  }: {
    currentUser?: AuthenticatedUser | null;
    em: EntityManager;
    currentOrmData?: any;
    rootOrmData?: any;
  },
): Promise<any> => {
  if (!currentOrmData) {
    await applyCreateOneResolver(gqlInput, {
      em,
      currentUser,
      type,
    });
  } else {
    await applyUpdateOneResolver(gqlInput, {
      em,
      currentUser,
      currentOrmData,
      type,
    });
  }

  const ormData = await Object.keys(gqlInput).reduce(async (pdata, key) => {
    const data = await pdata;
    return await gqlUpsertKeyInputToOrm(gqlInput, data, key, type, {
      em,
      currentUser,
      currentOrmData,
      rootOrmData,
    });
  }, Promise.resolve({}));

  await applyStaticInputFieldResolver(type, {
    em,
    currentUser,
    currentOrmData,
    rootOrmData,
    gqlInput,
    ormData,
  });
  return ormData;
};

export const upsertMany = async (
  gqlInput: any,
  key: string | number | symbol,
  ormData: any,
  crudInfo: CrudInfo,
  type: Type<any>,
  {
    em,
    currentOrmData,
    currentUser,
    rootOrmData,
  }: {
    currentOrmData?: any;
    currentUser?: AuthenticatedUser | null;
    em: EntityManager;
    rootOrmData?: any;
  },
) => {
  if (isNil(gqlInput[key]) || Object.keys(gqlInput[key]).length === 0) {
    return;
  }
  if (currentOrmData && !crudInfo.isVirtual) {
    try {
      await em.populate(currentOrmData as any, [key as any]);
    } catch (e) {
      // TODO: find out if populate or not isVirtual does not work on runtime
      // console.error(e);
    }
  }

  const isManyRelation =
    isArray(gqlInput[key].disconnect) ||
    isArray(gqlInput[key].connect) ||
    isArray(gqlInput[key].create) ||
    isArray(gqlInput[key].update);

  const childCrudInfos = crudInfo.typeFn() as Type<any>;
  if (isManyRelation) {
    try {
      ormData[key] = currentOrmData?.[key]?.getItems
        ? currentOrmData?.[key]?.getItems()
        : isArray(currentOrmData?.[key])
          ? currentOrmData?.[key]
          : [];
    } catch (e) {
      // TODO: please use crudInfo to detect if it is a one or many relation
      ormData[key] = [];
    }
  }

  // disconnect
  if (Object.keys(gqlInput[key]).indexOf('disconnect') >= 0) {
    if (isArray(gqlInput[key].disconnect)) {
      const disconnectIds = gqlInput[key].disconnect.map(
        ({ id }: { id: string }) => id,
      );
      ormData[key] = ormData[key].filter((e: { id: string }) =>
        e.id ? !disconnectIds.includes(e.id) : true,
      );
    } else {
      ormData[key] = null;
    }
  }

  // connect
  if (Object.keys(gqlInput[key]).indexOf('connect') >= 0) {
    ormData[key] = isArray(gqlInput[key].connect)
      ? [
          ...gqlInput[key].connect
            .map(({ id }: { id: string }) => id)
            .filter(Boolean),
          ...ormData[key],
        ]
      : gqlInput[key].connect.id || undefined;
  }

  // create
  if (Object.keys(gqlInput[key]).indexOf('create') >= 0) {
    if (isArray(gqlInput[key].create)) {
      ormData[key] = await Promise.all([
        ...(ormData[key] || []),
        ...gqlInput[key].create
          .filter((c: any) => Object.keys(c).length)
          .map(
            async (input: any) =>
              await gqlUpsertInputToOrm(input, type, {
                em,
                currentUser,
                rootOrmData,
              }),
          ),
      ]);
    } else {
      if (Object.keys(gqlInput[key].create).length) {
        ormData[key] = await gqlUpsertInputToOrm(gqlInput[key].create, type, {
          em,
          currentUser,
          rootOrmData,
        });
      }
    }
  }

  // update
  if (Object.keys(gqlInput[key]).indexOf('update') >= 0) {
    if (isArray(gqlInput[key].update)) {
      // const currentReferences = current?.[key]?.getItems() || [];
      const references = await Promise.all(
        ormData[key].map(async (currentReference: any) => {
          // search for update input
          const updateInput =
            currentReference?.id &&
            gqlInput[key].update.find(
              (updateManyInput: any) =>
                updateManyInput?.where?.id === currentReference.id,
            );
          if (updateInput) {
            return {
              ...(await gqlUpsertInputToOrm(updateInput.data, childCrudInfos, {
                em,
                currentUser,
                currentOrmData: currentReference,
                rootOrmData,
              })),
              id: updateInput.where?.id,
            };
          }
          return currentReference;
        }),
      );
      ormData[key] = references;
    } else {
      if (Object.keys(gqlInput[key].update).length) {
        ormData[key] = {
          id: currentOrmData?.[key]?.id,
          ...(await gqlUpsertInputToOrm(gqlInput[key].update, childCrudInfos, {
            em,
            currentOrmData: currentOrmData?.[key],
            currentUser,
            rootOrmData,
          })),
        };
      }
    }
  }
};
