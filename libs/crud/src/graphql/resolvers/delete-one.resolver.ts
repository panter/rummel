import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { FindOneEntityWhereArgs } from '../generic-types';
import { applyStaticWhereFieldResolver, getCrudInfosForType } from '../utils';
import {
  CurrentRequest,
  CurrentUser,
  getFieldsToPopulate,
} from '@panter/nestjs-utils';
import { AuthenticatedUser } from '../types';
import { CrudAuditCallback, CrudAuthorizeCallback } from '../../';
import { CrudResource } from '../../service/crud-resource.decorator';

export interface IDeleteOneType<T> {
  deleteOne: (
    info: GraphQLResolveInfo,
    currentUser: AuthenticatedUser,
    request: Express.Request,
    data?: any,
  ) => Promise<T | null | undefined>;
}

export interface IDeleteOneOptions<T> {
  name?: string;
  onResolve?: IDeleteOneType<T>['deleteOne'];
  authorizeCallback?: CrudAuthorizeCallback;
  auditCallback?: CrudAuditCallback;
}

export function DeleteOneResolver<T>(
  classRef: Type<T>,
  {
    name,
    onResolve,
    authorizeCallback,
    auditCallback,
  }: IDeleteOneOptions<T> | undefined = {},
): Type<IDeleteOneType<T>> {
  @Resolver(() => classRef, { isAbstract: true })
  abstract class AbstractResolver implements IDeleteOneType<T> {
    protected authorizeCallback?: CrudAuthorizeCallback = authorizeCallback;
    protected auditCallback?: CrudAuditCallback = auditCallback;

    constructor(protected readonly em: EntityManager) {}

    @Mutation(() => classRef, { name: name || `deleteOne${classRef.name}` })
    async deleteOne(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: AuthenticatedUser,
      @CurrentRequest() request: Express.Request,
      @Args() args: FindOneEntityWhereArgs,
    ) {
      return resolveDeleteOne(classRef, args, {
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
      request: Express.Request,
      args?: any,
    ) {
      this.authorizeCallback?.({
        operation: 'update',
        resource: classRef.name,
        currentUser,
        request,
        condition: args,
        em: this.em,
      });
      let result;
      if (onResolve) {
        result = await onResolve(info, currentUser, request, args);
      } else {
        result = await super.deleteOne(info, currentUser, request, args);
      }
      this.auditCallback?.({
        operation: 'delete',
        resource: classRef.name,
        currentUser,
        data: {
          id: result?.id,
        },
      });
      return result;
    }
  }

  return ConcreteResolver as Type<IDeleteOneType<T>>;
}

export const resolveDeleteOne = async <T extends Type>(
  type: T,
  args: any,
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
  const ormQuery = { id: args.where.id };
  applyStaticWhereFieldResolver(crudInfos, {
    currentUser,
    ormQuery,
    gqlWhere: args.where,
  });
  const entity = await em.findOneOrFail(type, ormQuery, {
    populate: getFieldsToPopulate(info, type),
  });
  await em.removeAndFlush(entity);
  return entity;
};
