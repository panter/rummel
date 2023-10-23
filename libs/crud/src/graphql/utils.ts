import { ObjectQuery } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { GqlTypeReference } from '@nestjs/graphql';
import { TypeOptions } from '@nestjs/graphql/dist/interfaces/type-options.interface';
import { getFieldsAndDecoratorForType } from '@nestjs/graphql/dist/schema-builder/utils/get-fields-and-decorator.util';
import { uniqBy, upperFirst } from 'lodash';
// import { UserEntity } from '../../modules/user/models/user.entity';
import { CrudFieldOptions, getCrudFields } from './crud-field.decorator';
import {
  getCrudObjectOptions,
  InputResolverOptions,
} from './crud-object.decorator';
import { AuthenticatedUser } from './types';

export function notNil<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined;
}

export interface Class<T> {
  new (...args: any[]): T;
}

export const getTypeName = (classRef: Type<any>) => {
  return classRef.name.endsWith('Entity')
    ? classRef.name.slice(0, -6)
    : classRef.name;
};

export function getPrototypeChain(classRef: Type<unknown>): Type<unknown>[] {
  const baseClass = Object.getPrototypeOf(classRef) as Type<unknown>;
  if (baseClass) {
    return [classRef, ...getPrototypeChain(baseClass)];
  }
  return [classRef];
}

export const findCrudField = (name: string, options: CrudFieldOptions[]) =>
  options.find((t) => t.name === name);

export type CrudInfo = {
  schemaName: string;
  name: string;
  typeFn: () => GqlTypeReference;
  ormTypeFn?: () => GqlTypeReference;
  options: TypeOptions;
  crudOptions?: CrudFieldOptions;
  classRef: Type<unknown>;
  isVirtual?: boolean;
  // target: Function;
};

export const getCrudInfosForType = (classRef: Type<unknown>): CrudInfo[] => {
  if (classRef.constructor?.name !== 'Function') {
    if (!cache[classRef.constructor.name]) {
      console.error('Runtime crud infos not found', classRef.constructor.name);
    }
    return cache[classRef.constructor.name] || [];
  }

  const { fields } = getFieldsAndDecoratorForType(classRef);
  const uniqueFields = uniqBy(fields, (f) => f.name);
  const crudObjectOptions = getCrudObjectOptions(classRef);
  const crudFields = [
    ...(crudObjectOptions?.alias
      ? getCrudFields(crudObjectOptions?.alias) || []
      : []),
    ...(getCrudFields(classRef) || []),
  ];

  const crudFieldsInfos = uniqueFields.map<CrudInfo>((field) => {
    const crudOptions = findCrudField(field.name, crudFields);
    return {
      schemaName: field.schemaName,
      name: field.name,
      typeFn: field.typeFn,
      options: crudOptions?.fieldOptions || field.options,
      crudOptions: findCrudField(field.name, crudFields),
      classRef,
    };
  });

  crudFields.forEach((crudField) => {
    const field = uniqueFields.find((t) => t.name === crudField.name);
    if (field) {
      return;
    }
    if (!crudField.typeFn || !crudField.name) {
      throw new Error(
        `@CrudField ${crudField.name} for ${classRef.name} is missing a typeFn, name or @Field decorator`,
      );
    }

    crudFieldsInfos.push({
      isVirtual: true,
      schemaName: crudField.name,
      name: crudField.name,
      typeFn: crudField.typeFn,
      options: crudField?.fieldOptions || {},
      crudOptions: crudField,
      classRef,
    });
  });

  cache[classRef.name] = crudFieldsInfos;
  return crudFieldsInfos;
};

const cache: any = [];

export const instanceFromClass = (classRef: Type<unknown>) => {
  try {
    return new classRef();
  } catch (e) {
    return false;
  }
};

// export const applyDefaultWhereResolver = (
//   crudInfos: CrudInfo[],
//   {
//     currentUser,
//     ormQuery,
//     where
//   }: { currentUser: UserEntity; ormQuery: object; where: object }
// ) => {
//   crudInfos.forEach((crudInfo) => {
//     if (crudInfo.crudOptions?.defaultWhereResolver) {
//       crudInfo.crudOptions.defaultWhereResolver(ormQuery, where, {
//         currentUser
//       });
//     }
//   });
// };

export const applyCreateOneResolver = async <Entity>(
  gqlInput: object,
  options: InputResolverOptions<Entity>,
) => {
  const crudObjectOptions = getCrudObjectOptions(options.type);
  return Promise.all(
    crudObjectOptions?.createOne?.map(
      async (cb) => await cb(gqlInput, options),
    ) || [],
  );
};

export const applyUpdateOneResolver = async <Entity>(
  gqlInput: object,
  options: InputResolverOptions<Entity>,
) => {
  const crudObjectOptions = getCrudObjectOptions(options.type);
  return Promise.all(
    crudObjectOptions?.updateOne?.map(
      async (cb) => await cb(gqlInput, options),
    ) || [],
  );
};

export const applyStaticWhereFieldResolver = <T = any>(
  crudInfos: CrudInfo[],
  {
    currentUser,
    ormQuery,
    gqlWhere,
  }: {
    currentUser: AuthenticatedUser;
    ormQuery: ObjectQuery<T>;
    gqlWhere: any;
  },
) => {
  crudInfos.forEach((crudInfo) => {
    if (crudInfo.crudOptions?.staticWhereResolver) {
      crudInfo.crudOptions.staticWhereResolver(ormQuery, gqlWhere, {
        currentUser,
        key: crudInfo.name,
      });
    }
  });
};

export const applyStaticInputFieldResolver = async <Entity>(
  type: Type<Entity>,
  {
    em,
    currentUser,
    ormData,
    gqlInput,
    currentOrmData,
    rootOrmData,
  }: {
    em: EntityManager;
    currentUser: AuthenticatedUser;
    ormData: object;
    gqlInput: object;
    rootOrmData?: object;
    currentOrmData?: object;
  },
) => {
  const crudInfos = getCrudInfosForType(type);
  return Promise.all(
    crudInfos.map(async (crudInfo) => {
      if (crudInfo.crudOptions?.staticInputResolver) {
        await crudInfo.crudOptions.staticInputResolver(ormData, gqlInput, {
          em,
          currentOrmData,
          rootOrmData,
          currentUser,
          type,
          crudInfo,
          key: crudInfo.name,
        });
      }
    }),
  );
};

export const makePrefixedFullName = (name: string, prefix?: string) =>
  !prefix ? name : prefix + upperFirst(name);
