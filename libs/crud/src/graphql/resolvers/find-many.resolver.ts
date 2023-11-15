import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Int, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { isArray, lowerFirst } from 'lodash';
import pluralize from 'pluralize';
import { gqlFilterToMikro } from '../gql-filter-to-mikro-orm';
import { getCrudInfosForType } from '../utils';
import { findManyEntityArgs } from '../find-many-entity-args';
import {
  CurrentRequest,
  CurrentUser,
  getFieldsToPopulate,
} from '@panter/nestjs-utils';
import { AuthenticatedUser } from '../types';
import { CrudAuditCallback, CrudAuthorizeCallback } from '../../types';
import { CrudResource } from '../../crud-resource.decorator';

export interface IFindManyType<T> {
  findMany: (
    info: GraphQLResolveInfo,
    currentUser: AuthenticatedUser,
    request: Express.Request,
    input: any,
  ) => Promise<T[]>;
  findManyCount: (
    currentUser: AuthenticatedUser,
    request: Express.Request,
    input: any,
  ) => Promise<number>;
}

export interface IFindManyOptions<T> {
  name?: string;
  nullable?: boolean;
  onResolve?: IFindManyType<T>['findMany'];
  onCountResolve?: IFindManyType<T>['findManyCount'];
  authorizeCallback?: CrudAuthorizeCallback;
  auditCallback?: CrudAuditCallback;
}

export function FindManyResolver<T>(
  classRef: Type<T>,
  {
    name,
    onResolve,
    onCountResolve,
    nullable,
    authorizeCallback,
    auditCallback,
  }: IFindManyOptions<T> | undefined = {},
): Type<IFindManyType<T>> {
  const FindManyArgs = findManyEntityArgs(classRef);

  const methodName = name ? name : pluralize(lowerFirst(classRef.name));

  @Resolver(() => classRef, { isAbstract: true })
  abstract class AbstractResolver implements IFindManyType<T> {
    protected authorizeCallback?: CrudAuthorizeCallback = authorizeCallback;
    protected auditCallback?: CrudAuditCallback = auditCallback;

    constructor(protected readonly em: EntityManager) {}

    @Query(() => [classRef], {
      name: methodName,
    })
    async findMany(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: AuthenticatedUser,
      @CurrentRequest() _request: Express.Request,
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
      @CurrentRequest() _request: Request,
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
      request: Express.Request,
      input: any,
    ) {
      this.authorizeCallback?.({
        operation: 'read',
        resource: classRef.name,
        currentUser,
        request,
        data: input,
        em: this.em,
      });
      this.auditCallback?.({
        operation: 'read',
        resource: classRef.name,
        currentUser,
        data: input,
      });
      if (onResolve) {
        return onResolve(info, currentUser, request, input);
      }
      return super.findMany(info, currentUser, request, input);
    }

    @Query(() => Int, {
      name: `${methodName}Count`,
    })
    override async findManyCount(
      currentUser: AuthenticatedUser,
      request: Express.Request,
      input: any,
    ) {
      this.authorizeCallback?.({
        operation: 'read',
        resource: classRef.name,
        currentUser,
        request,
        data: input,
        em: this.em,
      });
      if (onCountResolve) {
        return onCountResolve(currentUser, request, input);
      }
      return super.findManyCount(currentUser, request, input);
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
