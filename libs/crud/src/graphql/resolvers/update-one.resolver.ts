import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Mutation, Resolver } from '@nestjs/graphql';
import { isArray } from 'lodash';
import { EntityIdInput } from '../generic-types';
import { gqlFilterToMikro } from '../gql-filter-to-mikro-orm';
import { gqlUpsertInputToOrm } from '../gql-upsert-input-to-mikro-orm';
import { upsertInput } from '../upsert-input';
import { getCrudInfosForType } from '../utils';
import { GraphQLResolveInfo } from 'graphql/type';
import { CurrentUser } from '../../temp/current-user.decorator';
import { getFieldsToPopulate } from '../../temp/get-fields-to-populate';

export type IUpdateOneType<T> = {
  updateOne: (
    info: GraphQLResolveInfo,
    currentUser: any,
    data?: any,
    where?: any,
  ) => Promise<T>;
};

export function UpdateOneResolver<T>(
  classRef: Type<T>,
  {
    name,
    onResolve,
  }:
    | { name?: string; onResolve?: IUpdateOneType<T>['updateOne'] }
    | undefined = {},
): Type<IUpdateOneType<T>> {
  const UpdateOneArg = upsertInput(classRef, { isUpdate: true });

  const methodName = name || `updateOne${classRef.name}`;

  @Resolver(() => classRef, { isAbstract: true })
  abstract class AbstractResolver implements IUpdateOneType<T> {
    constructor(protected readonly em: EntityManager) {}

    @Mutation(() => classRef, { name: methodName })
    async updateOne(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: any,
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

  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractResolver {
    @Mutation(() => classRef, { name: methodName })
    override async updateOne(
      info: GraphQLResolveInfo,
      currentUser: any,
      data?: any,
      where?: EntityIdInput,
    ) {
      if (onResolve) {
        return onResolve(info, currentUser, data, where);
      }
      return super.updateOne(info, currentUser, data, where);
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
    currentUser: any;
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
