import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
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

export type IUpdateOneType<T> = {
  updateOne: (
    info: GraphQLResolveInfo,
    currentUser: AuthenticatedUser,
    request: Express.Request,
    data?: any,
    where?: any,
  ) => Promise<T>;
};

export interface IUpdateOneOptions<T> {
  name?: string;
  onResolve?: IUpdateOneType<T>['updateOne'];
  authorizeCallback?: CrudAuthorizeCallback;
  auditCallback?: CrudAuditCallback;
}

export function UpdateOneResolver<T>(
  classRef: Type<T>,
  {
    name,
    onResolve,
    authorizeCallback,
    auditCallback,
  }: IUpdateOneOptions<T> | undefined = {},
): Type<IUpdateOneType<T>> {
  const UpdateOneArg = upsertInput(classRef, { isUpdate: true });

  const methodName = name || `updateOne${classRef.name}`;

  @Resolver(() => classRef, { isAbstract: true })
  abstract class AbstractResolver implements IUpdateOneType<T> {
    protected authorizeCallback?: CrudAuthorizeCallback = authorizeCallback;
    protected auditCallback?: CrudAuditCallback = auditCallback;

    constructor(protected readonly em: EntityManager) {}

    @Mutation(() => classRef, { name: methodName })
    async updateOne(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: AuthenticatedUser,
      @CurrentRequest() request: Express.Request,
      @Args('data', { type: () => UpdateOneArg, nullable: true })
      data?: any,
      @Args('where', { type: () => EntityIdInput })
      where?: EntityIdInput,
    ) {
      return resolveUpdateOne(classRef, data, where, {
        info,
        currentUser,
        persist: true,
        em: this.em,
      });
    }
  }

  @CrudResource(classRef.name)
  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractResolver {
    @Mutation(() => classRef, { name: methodName })
    override async updateOne(
      info: GraphQLResolveInfo,
      currentUser: AuthenticatedUser,
      request: Express.Request,
      data?: any,
      where?: EntityIdInput,
    ) {
      this.authorizeCallback?.({
        operation: 'update',
        resource: classRef.name,
        currentUser,
        request,
        data,
        condition: where,
        em: this.em,
      });
      let result;
      if (onResolve) {
        result = await onResolve(info, currentUser, request, data, where);
      } else {
        result = await super.updateOne(info, currentUser, request, data, where);
      }
      this.auditCallback?.({
        operation: 'update',
        resource: classRef.name,
        currentUser,
        data: {
          ...data,
          id: result?.id,
        },
      });
      return result;
    }
  }

  return ConcreteResolver as Type<IUpdateOneType<T>>;
}

export const resolveUpdateOne = async <T extends Type>(
  type: T,
  data: any,
  where: any,
  {
    persist,
    currentUser,
    em,
    info,
  }: {
    persist: boolean;
    currentUser: AuthenticatedUser;
    em: EntityManager;
    info: GraphQLResolveInfo;
  },
) => {
  const crudInfos = getCrudInfosForType(type);
  const ormQueryRaw =
    gqlFilterToMikro<T>({ id: where.id }, crudInfos, {
      currentUser,
    }) || {};

  const ormQuery = isArray(ormQueryRaw) ? ormQueryRaw[0] : ormQueryRaw;

  const currentOrmData = await em.findOneOrFail(type, ormQuery);

  const updateData = await gqlUpsertInputToOrm(data, type, {
    em,
    currentUser,
    currentOrmData,
    rootOrmData: currentOrmData,
  });

  wrap(currentOrmData).assign(updateData, {
    em,
  });

  if (persist) {
    await em.persistAndFlush(currentOrmData);
    await em.populate(currentOrmData, getFieldsToPopulate(info, type), {
      refresh: true,
    });
  }
  return currentOrmData;
};
