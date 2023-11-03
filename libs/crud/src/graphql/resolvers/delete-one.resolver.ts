import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { FindOneEntityWhereArgs } from '../generic-types';
import { applyStaticWhereFieldResolver, getCrudInfosForType } from '../utils';
import { CurrentUser, getFieldsToPopulate } from '@panter/nestjs-utils';
import { AuthenticatedUser } from '../types';
import { CrudAuthorizationService, CrudResource } from '../../auth';

export interface IDeleteOneType<T> {
  deleteOne: (
    info: GraphQLResolveInfo,
    currentUser: AuthenticatedUser,
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
    constructor(
      protected readonly em: EntityManager,
      protected readonly crudAuth: CrudAuthorizationService,
    ) {}

    @Mutation(() => classRef, { name: name || `deleteOne${classRef.name}` })
    async deleteOne(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: AuthenticatedUser,
      @Args() data: FindOneEntityWhereArgs,
    ) {
      return resolveDeleteOne(classRef, data, {
        info,
        currentUser,
        em: this.em,
      });
    }
  }

  @CrudResource(classRef.name)
  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractResolver {
    @Mutation(() => classRef, { name: name || `deleteOne${classRef.name}` })
    async deleteOne(
      info: GraphQLResolveInfo,
      currentUser: AuthenticatedUser,
      data?: any,
    ) {
      this.crudAuth?.authorize?.(
        'delete',
        classRef.name,
        currentUser,
        undefined,
      );
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
    currentUser: AuthenticatedUser;
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
