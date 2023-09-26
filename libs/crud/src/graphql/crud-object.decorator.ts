import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import 'reflect-metadata';
import { getTypeName } from './utils';

export type InputResolverOptions<Entity> = {
  em: EntityManager;
  currentUser: any;
  currentOrmData?: Entity;
  type: Type<Entity>;
};
export type InputResolver<Entity = any, GqlInput = any> = (
  gqlInput: GqlInput,
  options: InputResolverOptions<Entity>,
) => Promise<void>;

/**
 * The idea is to cache the options for each type.
 * Ideally we would like to use Reflect.getMetadata but it
 * I ran into problems so i resorted to to a classic map cache approach.
 *
 */

const cache = new Map<Type<unknown>, CrudObjectOptions>();
const addToCache = (target: any, options: CrudObjectOptions) => {
  cache.set(target, options);
};

// const CRUD_OBJECT_METADATA_NAME = 'crud:object';

export type CrudObjectProps<Entity = any, GqlInput = any> = {
  alias?: Type<unknown>;
  createOne?: [InputResolver<Entity, GqlInput>];
  updateOne?: [InputResolver<Entity, GqlInput>];
  // findManyOne?: (all the necessary args) => void );
  // ... all the cruds overwride
};
export type CrudObjectOptions<Entity = any, GqlInput = any> = CrudObjectProps<
  Entity,
  GqlInput
> & {
  targetName: string;
  target: Type<unknown>;
};

export function CrudObject<Entity = any, GqlInput = any>(
  options: CrudObjectProps<Entity, GqlInput> = {},
) {
  return function (target: any) {
    const meta: CrudObjectOptions<Entity, GqlInput> = {
      ...options,
      target,
      targetName: getTypeName(target),
    };
    addToCache(target, meta);
    // Reflect.defineMetadata(
    //   CRUD_OBJECT_METADATA_NAME,
    //   meta,
    // );
  };
}

export function getCrudObjectOptions<DTO>(
  target: Type<DTO>,
): CrudObjectOptions | undefined {
  return cache.get(target);
  // const options = getPrototypeChain(target).reduce((options, Cls) => {
  //   if (cache.get(Cls.prototype)) {
  //     return cache.get(Cls.prototype);
  //   }
  //   return options;
  // }, [] as any);

  // return options;
}
