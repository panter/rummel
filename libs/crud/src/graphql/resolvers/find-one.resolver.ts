import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { isArray, lowerFirst } from 'lodash';
import { FindOneEntityWhereArgs } from '../generic-types';
import { gqlFilterToMikro } from '../gql-filter-to-mikro-orm';
import { getCrudInfosForType } from '../utils';
import { CurrentUser, getFieldsToPopulate } from '@panter/nestjs-utils';
import { AuthenticatedUser } from '../types';
import { CrudAuthorization, CrudResource } from '../../auth';

export interface IFindOneType<T> {
  findOne: (
    info: GraphQLResolveInfo,
    currentUser: AuthenticatedUser,
    whereArgs: FindOneEntityWhereArgs,
  ) => Promise<T | null | undefined>;
}

export function FindOneResolver<T>(
  classRef: Type<T>,
  {
    name,
    onResolve,
  }:
    | {
        name?: string;
        onResolve?: (
          info: GraphQLResolveInfo,
          currentUser: AuthenticatedUser,
          data: any,
        ) => Promise<any>;
      }
    | undefined = {},
): Type<IFindOneType<T>> {
  const methodName = name ? name : lowerFirst(classRef.name);

  @Resolver(() => classRef, { isAbstract: true })
  abstract class AbstractResolver implements IFindOneType<T> {
    constructor(protected readonly em: EntityManager) {}

    @Query(() => classRef, {
      name: methodName,
      nullable: true,
    })
    async findOne(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: AuthenticatedUser,
      @Args()
      { where: { id } }: FindOneEntityWhereArgs,
    ) {
      return resolveFindOne(classRef, id, {
        info,
        currentUser,
        em: this.em,
      });
    }
  }

  @CrudResource(classRef.name)
  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractResolver {
    @Query(() => classRef, {
      name: methodName,
      nullable: true,
    })
    async findOne(
      info: GraphQLResolveInfo,
      currentUser: AuthenticatedUser,
      where: FindOneEntityWhereArgs,
    ) {
      //TODO: how to check more granular permissions? like user.tenantId === resource.tenantId
      CrudAuthorization.instance?.authorize?.(
        'read',
        classRef.name,
        currentUser,
      );
      if (onResolve) {
        return onResolve(info, currentUser, where);
      }
      return super.findOne(info, currentUser, where);
    }
  }

  return ConcreteResolver as Type<IFindOneType<T>>;
}

export const resolveFindOne = async <T extends Type>(
  type: T,
  id: string,
  {
    info,
    em,
    currentUser,
  }: {
    em: EntityManager;
    currentUser: AuthenticatedUser;
    info: GraphQLResolveInfo;
  },
) => {
  const crudInfos = getCrudInfosForType(type);

  const ormQueryRaw =
    gqlFilterToMikro<T>({ id }, crudInfos, {
      currentUser,
    }) || {};

  const ormQuery = isArray(ormQueryRaw) ? ormQueryRaw[0] : ormQueryRaw;

  return em.findOne(type, ormQuery, {
    populate: getFieldsToPopulate(info, type),
  });
};
