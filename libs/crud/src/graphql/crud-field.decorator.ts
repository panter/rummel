import { EntityManager, ObjectQuery } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { ReturnTypeFunc } from '@nestjs/graphql';
import { TypeOptions } from '@nestjs/graphql/dist/interfaces/type-options.interface';
import { uniqBy } from 'lodash';
import 'reflect-metadata';
// import { UserEntity } from '../../modules/user/models/user.entity';
import { CrudInfo, getPrototypeChain } from './utils';
import { AuthenticatedUser } from './types';

/**
 * The idea is to cache the options for each type.
 * Ideally we would like to use Reflect.getMetadata but it
 * I ran into problems so i resorted to to a classic map cache approach.
 *
 */

const cache = new Map<Type<unknown>, { [key: string]: CrudFieldOptions }>();
const addToCache = (target: any, key: string, options: any) => {
  const cached = cache.get(target);
  if (cached) {
    cached[key] = options;
  } else {
    cache.set(target, { [key]: options });
  }
};

// const CRUD_FIELD_METADATA_NAME = 'crud:field';
export type WhereFieldResolver<Entity = any, GqlWhere = any> = (
  ormQuery: ObjectQuery<Entity>,
  gqlWhere: GqlWhere,
  options: {
    currentUser?: AuthenticatedUser | null;
    key: string | number | symbol;
  },
) => void;

export type InputFieldResolverOptions<Entity> = {
  em: EntityManager;
  currentUser?: AuthenticatedUser | null;
  currentOrmData?: Entity;
  rootOrmData?: Entity;
  type: Type<Entity>;
  crudInfo: CrudInfo;
  skipInputResolver?: boolean;
  key: string | number | symbol;
};
export type InputFieldResolver<Entity = any, GqlInput = any> = (
  ormData: Entity,
  gqlInput: GqlInput,
  options: InputFieldResolverOptions<Entity>,
) => Promise<void>;

export type CrudRelationFieldOptions = {
  /**
   * If set to `true`, the relation cannot be connected by primary key
   */
  hideConnect?: boolean;
  /**
   *  If set to `true`, the relation can be created with all it's fields.
   */
  showCreate?: boolean;
  /**
   *  If set to `true`, the relation can be updated with all it's fields.
   */
  showUpdate?: boolean;
  /**
   *  If set to `true`, the relation cannot be disconnected by primary key.
   */
  hideDisconnect?: boolean;
};

export type CrudFieldProps<Entity = any, GqlInput = any, GqlWhere = any> = {
  typeFn?: ReturnTypeFunc;
  // TODO: this is for CatalogProductPropertyWithValue so we can handle it like the other fields
  ormTypeFn?: ReturnTypeFunc;
  name?: string;
  /**
   * Schema instructions.
   *  If set to `true`, the field will be hidden from the create operation, so the field cannot be set during creation.
   */
  hideCreate?: boolean;
  /**
   * If set to `true`, the field will be hidden from the update operation, so the field cannot be updated.
   */
  hideUpdate?: boolean;
  /**
   * Schema instructions.
   * If set to `true`, the field will be hidden from the where input type, so the field cannot be filtered.
   */
  hideWhere?: boolean;
  /**
   * Schema instructions.
   * If set to `true`, the relation can be connected by primary key
   */
  fieldOptions?: TypeOptions;
  /**
   * Relation schema instructions
   */
  relation?: CrudRelationFieldOptions & {
    parentPropert?: string;
  };
  staticWhereResolver?: WhereFieldResolver<Entity, GqlWhere>;
  whereResolver?: WhereFieldResolver<Entity, GqlWhere>;
  inputResolver?: true | InputFieldResolver<Entity, GqlInput>;
  staticInputResolver?: InputFieldResolver<Entity, GqlInput>;
};
export type CrudFieldOptions<
  Entity = any,
  GqlInput = any,
  GqlWhere = any,
> = CrudFieldProps<Entity, GqlInput, GqlWhere> & { propertyKey: string };

export function CrudField<Entity = any, GqlInput = any, GqlWhere = any>(
  options: CrudFieldProps<Entity, GqlInput, GqlWhere> = {},
) {
  return function (target: any, propertyKey: string) {
    const meta: CrudFieldOptions<Entity, GqlInput, GqlWhere> = {
      name: propertyKey,
      ...options,
      propertyKey,
    };

    addToCache(target, propertyKey, meta);
    // Reflect.defineMetadata(
    //   CRUD_FIELD_METADATA_NAME,
    //   { name: propertyKey, ...options, propertyKey },
    //   target,
    //   propertyKey
    // );
  };
}

export function getCrudFields<DTO>(target: Type<DTO>): CrudFieldOptions[] {
  const options = getPrototypeChain(target).reduce((fields, Cls) => {
    const cached = cache.get(Cls.prototype);

    if (!cached) {
      return fields;
    }
    return uniqBy(
      Object.values(cached).reduce((allFields, field) => {
        return [...allFields, field];
      }, fields),
      'name',
    );
  }, [] as any);

  return options;
}
