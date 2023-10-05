import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { gqlUpsertInputToOrm } from '../gql-upsert-input-to-mikro-orm';
import { upsertInput } from '../upsert-input';
import { CurrentUser } from '../../temp/current-user.decorator';
import { getFieldsToPopulate } from '../../temp/get-fields-to-populate';

export interface ICreateOneType<T> {
  createOne: (
    info: GraphQLResolveInfo,
    currentUser: any,
    data?: any,
  ) => Promise<T | null | undefined>;
}

export function CreateOneResolver<T>(
  classRef: Type<T>,
  {
    name,
    onResolve,
  }:
    | { name?: string; onResolve?: ICreateOneType<T>['createOne'] }
    | undefined = {},
): Type<ICreateOneType<T>> {
  const CreateOneArg = upsertInput(classRef);

  @Resolver(() => classRef, { isAbstract: true })
  abstract class AbstractResolver implements ICreateOneType<T> {
    constructor(protected readonly em: EntityManager) {}

    @Mutation(() => classRef, { name: name || `createOne${classRef.name}` })
    async createOne(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: any,
      @Args('data', {
        type: () => CreateOneArg,
        nullable: true,
      })
      data?: any,
    ) {
      return resolveCreateOne(classRef, data, {
        info,
        currentUser,
        persist: true,
        em: this.em,
      });
    }
  }

  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractResolver {
    @Mutation(() => classRef, { name: name || `createOne${classRef.name}` })
    async createOne(info: GraphQLResolveInfo, currentUser: any, data?: any) {
      if (onResolve) {
        return onResolve(info, currentUser, data);
      }
      return super.createOne(info, currentUser, data);
    }
  }

  return ConcreteResolver as Type<ICreateOneType<T>>;
}

export const resolveCreateOne = async <T extends Type>(
  type: T,
  data: any,
  {
    persist,
    currentUser,
    em,
    info,
  }: {
    persist: boolean;
    currentUser: any;
    em: EntityManager;
    info: GraphQLResolveInfo;
  },
) => {
  const entity = new type();
  const createData = await gqlUpsertInputToOrm(data, entity, {
    em,
    currentUser,
    rootOrmData: entity,
  });

  wrap(entity).assign(createData, { em });
  if (persist) {
    await em.persistAndFlush(entity);
    await em.populate(entity, getFieldsToPopulate(info, type), {
      refresh: true,
    });
  }
  return entity;
};
