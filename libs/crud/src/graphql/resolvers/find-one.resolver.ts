import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { isArray, lowerFirst } from 'lodash';
import { FindOneEntityWhereArgs } from '../generic-types';
import { gqlFilterToMikro } from '../gql-filter-to-mikro-orm';
import { getCrudInfosForType } from '../utils';
import {
  CurrentRequest,
  CurrentUser,
  getFieldsToPopulate,
} from '@panter/nestjs-utils';
import { AuthenticatedUser } from '../types';
import { CrudAuditCallback, CrudAuthorizeCallback } from '../../types';
import { CrudResource } from '../../crud-resource.decorator';

export type IFindOneContext<T> = {
  classRef: Type<T>;
  info: GraphQLResolveInfo;
  currentUser?: AuthenticatedUser | null | undefined;
  request: Express.Request;
  data?: FindOneEntityWhereArgs | null;
};

export interface IFindOneOptions<T> {
  name?: string;
  nullable?: boolean;
  resolveCallback?: (
    args: IFindOneContext<T>,
    em: EntityManager,
  ) => Promise<T | null | undefined>;
  authorizeCallback?: CrudAuthorizeCallback;
  auditCallback?: CrudAuditCallback;
}

function AbstractFindOneService<T>(
  classRef: Type<T>,
  options: IFindOneOptions<T> = {},
) {
  abstract class Resolver {
    authorizeCallback?: CrudAuthorizeCallback = options.authorizeCallback;
    auditCallback?: CrudAuditCallback = options.auditCallback;

    constructor(readonly em: EntityManager) {}

    async mapData(
      args?: FindOneEntityWhereArgs | null,
    ): Promise<FindOneEntityWhereArgs | null | undefined> {
      return args;
    }

    async mapResult(result?: T | null): Promise<T | null | undefined> {
      return result;
    }

    async resolveBeforeFindOne(_context: IFindOneContext<T>): Promise<void> {
      // Custom logic before findOne can be placed here
    }

    async resolveQuery(context: IFindOneContext<T>) {
      const crudInfos = getCrudInfosForType(context.classRef);

      const ormQueryRaw =
        gqlFilterToMikro<T>(context.data?.where, crudInfos, {
          currentUser: context.currentUser,
        }) || {};

      const ormQuery = isArray(ormQueryRaw) ? ormQueryRaw[0] : ormQueryRaw;
      return ormQuery;
    }

    async resolveAfterFindOne(
      _context: IFindOneContext<T>,
      result: T | null | undefined,
    ): Promise<T | null | undefined> {
      // Custom logic after findOne can be placed here
      return result;
    }

    async findOne(
      info: GraphQLResolveInfo,
      currentUser: AuthenticatedUser | undefined,
      request: Express.Request,
      initData: FindOneEntityWhereArgs,
    ) {
      const data = await this.mapData(initData);

      const context: IFindOneContext<T> = {
        info,
        currentUser,
        request,
        data,
        classRef,
      };

      await this.resolveBeforeFindOne(context);
      const ormQuery = await this.resolveQuery(context);

      console.log('asaaa', this.em);
      let result = await this.em.findOne(classRef, ormQuery, {
        populate: getFieldsToPopulate(info, classRef),
      });

      result = await this.resolveAfterFindOne(context, result);

      return this.mapResult(result);
    }
  }

  return Resolver;
}

export function FindOneResolver<T>(
  classRef: Type<T>,
  options: IFindOneOptions<T> = {},
) {
  const methodName = options.name ? options.name : lowerFirst(classRef.name);

  @CrudResource(classRef.name)
  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractFindOneService(classRef, options) {
    constructor(em: EntityManager) {
      super(em);
    }

    @Query(() => classRef, {
      name: methodName,
      nullable: true,
    })
    async doFindOne(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: AuthenticatedUser,
      @CurrentRequest() request: Express.Request,
      @Args()
      data: FindOneEntityWhereArgs,
    ) {
      const context: IFindOneContext<T> = {
        info,
        currentUser,
        request,
        data,
        classRef,
      };

      this.authorizeCallback?.({
        operation: 'read',
        resource: classRef.name,
        currentUser,
        request,
        condition: data,
        em: this.em,
      });
      this.auditCallback?.({
        operation: 'read',
        resource: classRef.name,
        currentUser,
        data,
      });

      if (options.resolveCallback) {
        return options.resolveCallback(context, this.em);
      }
      return this.findOne(info, currentUser, request, data);
    }
  }

  return ConcreteResolver;
}
