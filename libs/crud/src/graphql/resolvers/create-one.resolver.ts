import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { gqlUpsertInputToOrm } from '../gql-upsert-input-to-mikro-orm';
import { upsertInput } from '../upsert-input';
import {
  CurrentRequest,
  CurrentUser,
  getFieldsToPopulate,
} from '@panter/nestjs-utils';
import { AuthenticatedUser } from '../types';
import { CrudAuthorizationService, CrudResource } from '../../auth';

export interface ICreateOneType<T> {
  createOne: (
    info: GraphQLResolveInfo,
    currentUser: AuthenticatedUser,
    request: Express.Request,
    data?: any,
  ) => Promise<T | null | undefined>;
}

export interface ICreateOneOptions<T> {
  name?: string;
  onResolve?: ICreateOneType<T>['createOne'];
}

export function CreateOneResolver<T>(
  classRef: Type<T>,
  { name, onResolve }: ICreateOneOptions<T> | undefined = {},
): Type<ICreateOneType<T>> {
  const CreateOneArg = upsertInput(classRef);

  @Resolver(() => classRef, { isAbstract: true })
  abstract class AbstractResolver implements ICreateOneType<T> {
    constructor(
      protected readonly em: EntityManager,
      protected readonly crudAuth: CrudAuthorizationService,
    ) {}

    @Mutation(() => classRef, { name: name || `createOne${classRef.name}` })
    async createOne(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: AuthenticatedUser,
      @CurrentRequest() request: Express.Request,
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

  @CrudResource(classRef.name)
  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractResolver {
    @Mutation(() => classRef, { name: name || `createOne${classRef.name}` })
    async createOne(
      info: GraphQLResolveInfo,
      currentUser: AuthenticatedUser,
      request: Express.Request,
      data?: any,
    ) {
      this.crudAuth?.authorize?.({
        operation: 'create',
        resource: classRef.name,
        currentUser,
        request,
        data,
      });
      if (onResolve) {
        return onResolve(info, currentUser, data);
      }
      return super.createOne(info, currentUser, request, data);
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
    currentUser: AuthenticatedUser;
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
