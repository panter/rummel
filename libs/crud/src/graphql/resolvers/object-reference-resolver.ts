import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import {
  Args,
  Info,
  Parent,
  ResolveField,
  Resolver,
  ReturnTypeFunc,
} from '@nestjs/graphql';
import { isArray, uniqBy } from 'lodash';
import { CrudInfo, getCrudInfosForType, notNil } from '../utils';
import { GraphQLResolveInfo } from 'graphql';
import { findManyEntityArgs } from '../find-many-entity-args';
import { gqlFilterToMikro } from '../gql-filter-to-mikro-orm';
import { ReferenceId } from '../generic-types';
import { CurrentUser, getFieldsToPopulate } from '@panter/nestjs-utils';

const SCALAR_NAMES = [
  'String',
  'ID',
  'Boolean',
  'Int',
  'BigInt',
  'Number',
  'Float',
  'Date',
];
const getDesignType = (p: CrudInfo) => {
  if (p.isVirtual && !p.crudOptions?.inputResolver) {
    return;
  }
  const designType = p.typeFn();
  if (p.options.isArray) {
    const manyDesignType = isArray(designType) ? designType[0] : designType;
    if (manyDesignType === String) {
      return;
    }

    return manyDesignType;
  } else if (
    SCALAR_NAMES.includes((designType as any).name) ||
    typeof designType !== 'function'
  ) {
    return;
  } else {
    return designType;
  }
};

export function ObjectReferenceResolvers<T>(
  classRef: Type<T>,
  options?: { omit?: Array<keyof T> },
): Type<any>[] {
  const omitProperties = options?.omit?.map((k) => k.toString()) || [];
  const crudFields = uniqBy(getCrudInfosForType(classRef), (f) => f.name);
  const classes = crudFields
    .filter((crudInfo) => !omitProperties.includes(crudInfo.schemaName))
    .map((crudInfo) => {
      const referenceType = getDesignType(crudInfo);
      if (!referenceType) {
        return;
      }

      const isMany = crudInfo.options.isArray;
      const schemaName = isMany
        ? `${crudInfo.schemaName}Ids`
        : `${crudInfo.schemaName}Id`;

      const schemaType = isMany ? [ReferenceId] : ReferenceId;

      if (isMany) {
        return manyReference(
          classRef,
          referenceType,
          schemaName,
          () => schemaType,
          crudInfo,
        );
      } else {
        return oneReference(classRef, schemaName, () => schemaType, crudInfo);
      }
    })
    .filter(notNil);

  return classes;
}

const oneReference = (
  classRef: Type,
  schemaName: string,
  typeFunc: ReturnTypeFunc,
  crudInfo: CrudInfo,
) => {
  @Resolver(() => classRef, { isAbstract: true })
  class OneAbstractResolver {
    constructor(protected readonly em: EntityManager) {}

    @ResolveField(typeFunc, {
      name: schemaName,
      nullable: crudInfo.options.nullable,
    })
    [schemaName](@Parent() parent: any, @Info() info: GraphQLResolveInfo) {
      const populate = getFieldsToPopulate(info, classRef);
      this.em.populate(parent, populate);
      return parent[crudInfo.schemaName];
    }
  }

  @Resolver(() => classRef)
  class OneReferenceResolverClass extends OneAbstractResolver {}
  return OneReferenceResolverClass as Type<any>;
};

const manyReference = <T>(
  classRef: Type<T>,
  referenceType: any,
  schemaName: string,
  typeFunc: ReturnTypeFunc,
  crudInfo: CrudInfo,
) => {
  const FindManyArgs = findManyEntityArgs(referenceType);
  @Resolver(() => classRef, { isAbstract: true })
  class ManyAbstractResolver {
    constructor(protected readonly em: EntityManager) {}

    @ResolveField(typeFunc, {
      name: schemaName,
      nullable: crudInfo.options.nullable,
    })
    [schemaName](
      @Parent() parent: any,
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: any,
      @Args({ type: () => FindManyArgs }) input: any,
    ) {
      const populate = getFieldsToPopulate(info, classRef) as string[];

      const crudInfos = getCrudInfosForType(classRef);
      const where =
        gqlFilterToMikro<T>(input.where, crudInfos, currentUser) || {};

      return parent[crudInfo.schemaName].matching({
        where,
        orderBy: input.orderBy,
        offset: input.skip,
        limit: input.take,
        populate,
      });
    }
  }

  @Resolver(() => classRef)
  class ManyReferenceResolverClass extends ManyAbstractResolver {}
  return ManyReferenceResolverClass as Type<any>;
};
