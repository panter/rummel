import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { isArray } from 'lodash';
import { EntityIdInput } from '../generic-types';
import { gqlFilterToMikro } from '../gql-filter-to-mikro-orm';
import { gqlUpsertInputToOrm } from '../gql-upsert-input-to-mikro-orm';
import { upsertInput } from '../upsert-input';
import { getCrudInfosForType } from '../utils';
import {
  CurrentRequest,
  CurrentUser,
  getFieldsToPopulate,
} from '@panter/nestjs-utils';
import { AuthenticatedUser } from '../types';
import { CrudAuditCallback, CrudAuthorizeCallback } from '../../types';
import { CrudResource } from '../../crud-resource.decorator';
import { CrudEntityType } from '../crud-types';

export type IUpdateOneContext<T> = {
  classRef: Type<T>;
  info: GraphQLResolveInfo;
  currentUser?: AuthenticatedUser | null | undefined;
  request: Express.Request;
  data?: any;
  where?: EntityIdInput;
};

export interface IUpdateOneOptions<T> {
  name?: string;
  resolveCallback?: (
    args: IUpdateOneContext<T> & {
      em: EntityManager;
    },
  ) => Promise<T | null | undefined>;
  authorizeCallback?: CrudAuthorizeCallback;
  auditCallback?: CrudAuditCallback;
}

function AbstractUpdateOneService<T extends object>(
  classRef: Type<T>,
  options: IUpdateOneOptions<T> = {},
) {
  abstract class Resolver {
    authorizeCallback?: CrudAuthorizeCallback = options.authorizeCallback;
    auditCallback?: CrudAuditCallback = options.auditCallback;

    constructor(readonly em: EntityManager) {}

    async mapData(args?: any | null): Promise<any | null | undefined> {
      return args;
    }

    async initRequest(_context: IUpdateOneContext<T>): Promise<void> {
      // Custom logic before updateOne can be placed here
    }

    async resolveBeforeFlush(
      _context: IUpdateOneContext<T>,
      result: T,
    ): Promise<T> {
      // Custom logic after assign can be placed here
      return result;
    }

    async resolveAfterFlush(
      _context: IUpdateOneContext<T>,
      result: T | null | undefined,
    ): Promise<T | null | undefined> {
      // Custom logic after updateOne can be placed here
      return result;
    }

    async getOrmQuery(
      context: IUpdateOneContext<T>,
    ): Promise<Record<string, any>> {
      const crudInfos = getCrudInfosForType(classRef);
      const ormQueryRaw =
        gqlFilterToMikro<T>({ id: context.where?.id }, crudInfos, {
          currentUser: context.currentUser,
        }) || {};

      return isArray(ormQueryRaw) ? ormQueryRaw[0] : ormQueryRaw;
    }

    async initEntity(context: IUpdateOneContext<T>): Promise<T> {
      const ormQuery = await this.getOrmQuery(context);
      return this.em.findOneOrFail(classRef, ormQuery);
    }

    async getUpdateData(
      entity: T,
      context: IUpdateOneContext<T>,
    ): Promise<any> {
      return gqlUpsertInputToOrm(context.data, classRef, {
        em: this.em,
        currentUser: context.currentUser,
        currentOrmData: entity,
        rootOrmData: entity,
      });
    }

    async updateOne(
      initContext: IUpdateOneContext<T>,
    ): Promise<T | null | undefined> {
      await this.initRequest(initContext);

      const context = {
        ...initContext,
        data: await this.mapData(initContext.data),
      };

      let entity = await this.initEntity(context);
      const updateData = await this.getUpdateData(entity, context);

      wrap(entity).assign(updateData, { em: this.em });

      entity = await this.resolveBeforeFlush(context, entity);

      await this.em.persistAndFlush(entity);
      await this.em.populate(
        entity,
        getFieldsToPopulate(context.info, classRef),
        {
          refresh: true,
        },
      );

      return await this.resolveAfterFlush(context, entity);
    }
  }

  return Resolver;
}

export function UpdateOneResolver<T extends object, NA extends string>(
  classRef: CrudEntityType<T, NA>,
  options: IUpdateOneOptions<T> = {},
) {
  const methodName = options.name || `updateOne${classRef.name}`;
  const UpdateOneArg = upsertInput(classRef, { isUpdate: true });

  @CrudResource(classRef.name)
  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractUpdateOneService(classRef, options) {
    constructor(em: EntityManager) {
      super(em);
    }

    @Mutation(() => classRef, { name: methodName })
    async doUpdateOne(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: AuthenticatedUser,
      @CurrentRequest() request: Express.Request,
      @Args('data', {
        type: () => UpdateOneArg,
        nullable: true,
      })
      data?: any,
      @Args('where', { type: () => EntityIdInput })
      where?: EntityIdInput,
    ): Promise<T | null | undefined> {
      this.authorizeCallback?.({
        operation: 'update',
        resource: classRef.name,
        currentUser,
        request,
        data,
        condition: where,
        em: this.em,
      });

      const context: IUpdateOneContext<T> = {
        info,
        currentUser,
        request,
        data,
        where,
        classRef,
      };

      let result;
      if (options.resolveCallback) {
        result = await options.resolveCallback({ ...context, em: this.em });
      } else {
        result = await this.updateOne(context);
      }

      this.auditCallback?.({
        operation: 'update',
        resource: classRef.name,
        currentUser,
        data: {
          ...data,
        },
      });

      return result;
    }
  }

  return ConcreteResolver;
}
