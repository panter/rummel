import { ObjectQuery } from '@mikro-orm/core';
// import { UserEntity } from '../../modules/user/models/user.entity';
import {
  applyStaticWhereFieldResolver,
  CrudInfo,
  getCrudInfosForType,
} from './utils';

type AllObjectQueryType = ObjectQuery<any> | ObjectQuery<any>[] | undefined;
const operators: {
  [key: string]: (
    ormQuery: {
      $or?: AllObjectQueryType;
      $and?: AllObjectQueryType;
      $not?: AllObjectQueryType;
      $eq?: AllObjectQueryType;
      $ilike?: string;
      $fulltext?: string;
      [key: string]: AllObjectQueryType | string;
    },
    key: string,
    gqlWhere: any,
    crudInfos: CrudInfo[],
    options: { parentKey?: string; currentUser: any },
  ) => void;
} = {
  OR: (obj, key, original, crudInfos, options) =>
    (obj[`$or`] = gqlFilterToMikro(original[key], crudInfos, options)),
  AND: (obj, key, original, crudInfos, options) =>
    (obj[`$and`] = gqlFilterToMikro(original[key], crudInfos, options)),
  NOT: (obj, key, original, crudInfos, options) =>
    (obj[`$not`] = gqlFilterToMikro(original[key], crudInfos, options)),
  equals: (obj, key, original) => (obj[`$eq`] = original[key]),
  contains: (obj, key, original, crudInfo, { parentKey }) =>
    parentKey === 'id'
      ? (obj[`$eq`] = original[key])
      : (obj[`$ilike`] = `%${original[key]}%`),
  in: (obj, key, original) => (obj[`$${key}`] = original[key]),
  nin: (obj, key, original) => (obj[`$${key}`] = original[key]),
  gt: (obj, key, original) => (obj[`$${key}`] = original[key]),
  gte: (obj, key, original) => (obj[`$${key}`] = original[key]),
  lt: (obj, key, original) => (obj[`$${key}`] = original[key]),
  lte: (obj, key, original) => (obj[`$${key}`] = original[key]),
  fulltext: (obj, key, original) => (obj[`$${key}`] = original[key]),
};

export function gqlFilterToMikro<T = any>(
  gqlWhere: any,
  crudInfos: CrudInfo[],
  options: {
    parentKey?: string;
    currentUser: any;
    isRelation?: boolean;
  },
): ObjectQuery<T> | ObjectQuery<T>[] | undefined {
  if (!gqlWhere) {
    const ormQuery = {};
    applyStaticWhereFieldResolver(crudInfos, {
      currentUser: options.currentUser,
      ormQuery,
      gqlWhere,
    });
    return ormQuery as any;
  }
  const isArray = gqlWhere instanceof Array;

  if (gqlWhere === null) {
    const ormQuery = isArray ? [] : {};
    applyStaticWhereFieldResolver(crudInfos, {
      currentUser: options.currentUser,
      ormQuery,
      gqlWhere,
    });
    return ormQuery as any;
  }

  const ormQuery: { [key: string]: any } = isArray ? [] : {};
  const keys = Object.keys(gqlWhere);
  for (const key of keys) {
    // TODO: 'mode' is used by react-admin, we ignore it this is dangerous "mode" can be a normal property
    if (key !== 'mode') {
      const crudInfo = crudInfos.find((p) => p.name === key);
      if (crudInfo?.crudOptions?.whereResolver) {
        crudInfo.crudOptions.whereResolver(ormQuery, gqlWhere, {
          currentUser: options.currentUser,
          key,
        });
      } else if (operators[key]) {
        operators[key](ormQuery, key, gqlWhere, crudInfos, {
          parentKey: options.parentKey,
          currentUser: options.currentUser,
        });
      } else if (gqlWhere[key] instanceof Object) {
        let parentCrudInfos = crudInfos;
        // TODO: was in hurry, need to find better way to know if it a relation

        try {
          parentCrudInfos =
            (key !== 'OR' &&
              key !== 'AND' &&
              key !== 'NOT' &&
              crudInfo &&
              getCrudInfosForType(crudInfo.typeFn() as any)) ||
            crudInfos;
        } catch (e) {
          // ignore
        }

        if (ormQuery instanceof Array) {
          ormQuery.push(
            gqlFilterToMikro(gqlWhere[key], parentCrudInfos, {
              parentKey: key,
              currentUser: options.currentUser,
            }),
          );
        } else {
          ormQuery[key] = gqlFilterToMikro(gqlWhere[key], parentCrudInfos, {
            parentKey: key,
            currentUser: options.currentUser,
            isRelation: true,
          });
        }
      } else {
        if (ormQuery instanceof Array) {
          ormQuery.push(gqlWhere[key]);
        } else {
          ormQuery[key] = gqlWhere[key];
        }
      }
    }
  }

  if (!options.isRelation) {
    applyStaticWhereFieldResolver(crudInfos, {
      currentUser: options.currentUser,
      ormQuery,
      gqlWhere,
    });
  }

  return ormQuery as any;
}
