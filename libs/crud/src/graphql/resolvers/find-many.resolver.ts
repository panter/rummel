import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Int, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { isArray, lowerFirst } from 'lodash';
import pluralize from 'pluralize';
import { gqlFilterToMikro } from '../gql-filter-to-mikro-orm';
import { getCrudInfosForType } from '../utils';
import { findManyEntityArgs } from '../find-many-entity-args';
import { CurrentUser, getFieldsToPopulate } from '@panter/nestjs-utils';
import { AuthenticatedUser } from '../types';
import { CrudAuthorization, CrudResource } from '../../auth';

export interface IFindManyType<T> {
  findMany: (
    info: GraphQLResolveInfo,
    currentUser: AuthenticatedUser,
    input: any,
  ) => Promise<T[]>;
  findManyCount: (
    currentUser: AuthenticatedUser,
    input: any,
  ) => Promise<number>;
}

export function FindManyResolver<T>(
  classRef: Type<T>,
  {
    name,
    onResolve,
    onCountResolve,
    nullable,
  }:
    | {
        name?: string;
        nullable?: boolean;
        onResolve?: (
          info: GraphQLResolveInfo,
          currentUser: AuthenticatedUser,
          data: any,
        ) => Promise<T[]>;
        onCountResolve?: (
          currentUser: AuthenticatedUser,
          data: any,
        ) => Promise<number>;
      }
    | undefined = {},
): Type<IFindManyType<T>> {
  const FindManyArgs = findManyEntityArgs(classRef);

  const methodName = name ? name : pluralize(lowerFirst(classRef.name));

  @Resolver(() => classRef, { isAbstract: true })
  abstract class AbstractResolver implements IFindManyType<T> {
    constructor(protected readonly em: EntityManager) {}

    @Query(() => [classRef], {
      name: methodName,
    })
    async findMany(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: AuthenticatedUser,
      @Args({ type: () => FindManyArgs, nullable })
      input: any,
    ): Promise<T[]> {
      return resolveFindMany(classRef, input, {
        info,
        currentUser,
        em: this.em,
      });
    }

    @Query(() => Int, {
      name: `${methodName}Count`,
    })
    async findManyCount(
      @CurrentUser() currentUser: AuthenticatedUser,
      @Args({ type: () => FindManyArgs, nullable })
      input: any,
    ): Promise<number> {
      const crudInfos = getCrudInfosForType(classRef);

      const ormQueryRaw =
        gqlFilterToMikro<T>(input.where, crudInfos, {
          currentUser,
        }) || {};

      const ormQuery = isArray(ormQueryRaw) ? ormQueryRaw[0] : ormQueryRaw;
      // return 0;
      return await this.em.count(classRef, ormQuery);
    }
  }

  @CrudResource(classRef.name)
  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractResolver {
    @Query(() => [classRef], {
      name: methodName,
    })
    override async findMany(
      info: GraphQLResolveInfo,
      currentUser: AuthenticatedUser,
      input: any,
    ) {
      CrudAuthorization.instance?.authorize?.(
        'read',
        classRef.name,
        currentUser,
      );
      if (onResolve) {
        return onResolve(info, currentUser, input);
      }
      return super.findMany(info, currentUser, input);
    }

    @Query(() => Int, {
      name: `${methodName}Count`,
    })
    override async findManyCount(currentUser: AuthenticatedUser, input: any) {
      CrudAuthorization.instance?.authorize?.(
        'read',
        classRef.name,
        currentUser,
      );
      if (onCountResolve) {
        return onCountResolve(currentUser, input);
      }
      return super.findManyCount(currentUser, input);
    }
  }

  return ConcreteResolver as Type<IFindManyType<T>>;
}

export const resolveFindMany = async <T extends Type>(
  type: T,
  input: any,
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
    gqlFilterToMikro<T>(input.where, crudInfos, {
      currentUser,
    }) || {};

  const ormQuery = isArray(ormQueryRaw) ? ormQueryRaw[0] : ormQueryRaw;
  return await em.find(type, ormQuery, {
    orderBy: input.orderBy,
    populate: getFieldsToPopulate(info, type),
    offset: input.skip,
    limit: input.take,
  });
};
