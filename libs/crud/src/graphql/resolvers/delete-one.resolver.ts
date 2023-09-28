import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Mutation, Resolver } from '@nestjs/graphql';
import { FindOneEntityWhereArgs } from '../generic-types';
import { applyStaticWhereFieldResolver, getCrudInfosForType } from '../utils';
import { GraphQLResolveInfo } from 'graphql/type';
import { CurrentUser } from '../../temp/current-user.decorator';
import { getFieldsToPopulate } from '../../temp/get-fields-to-populate';

export interface IDeleteOneType<T> {
  deleteOne: (
    info: GraphQLResolveInfo,
    currentUser: unknown,
    data?: any,
  ) => Promise<T | null | undefined>;
}

export function DeleteOneResolver<T>(
  classRef: Type<T>,
  {
    name,
    onResolve,
  }:
    | { name?: string; onResolve?: IDeleteOneType<T>['deleteOne'] }
    | undefined = {},
): Type<IDeleteOneType<T>> {
  @Resolver(() => classRef, { isAbstract: true })
  abstract class AbstractResolver implements IDeleteOneType<T> {
    constructor(protected readonly em: EntityManager) {}

    @Mutation(() => classRef, { name: name || `deleteOne${classRef.name}` })
    async deleteOne(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: unknown,
      @Args() data: FindOneEntityWhereArgs,
    ) {
      return resolveDeleteOne(classRef, data, {
        info,
        currentUser,
        em: this.em,
      });
    }
  }

  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractResolver {
    @Mutation(() => classRef, { name: name || `deleteOne${classRef.name}` })
    async deleteOne(info: GraphQLResolveInfo, currentUser: unknown, data?: any) {
      if (onResolve) {
        return onResolve(info, currentUser, data);
      }
      return super.deleteOne(info, currentUser, data);
    }
  }

  return ConcreteResolver as Type<IDeleteOneType<T>>;
}

export const resolveDeleteOne = async <T extends Type>(
  type: T,
  data: any,
  {
    currentUser,
    em,
    info,
  }: {
    currentUser: unknown;
    em: EntityManager;
    info: GraphQLResolveInfo;
  },
) => {
  const crudInfos = getCrudInfosForType(type);
  const ormQuery = { id: data.where.id };
  applyStaticWhereFieldResolver(crudInfos, {
    currentUser,
    ormQuery,
    gqlWhere: data.where,
  });
  const entity = await em.findOneOrFail(type, ormQuery, {
    populate: getFieldsToPopulate(info, type),
  });
  await em.removeAndFlush(entity);
  return entity;
};
