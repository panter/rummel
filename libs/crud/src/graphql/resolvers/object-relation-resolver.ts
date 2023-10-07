import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { isArray, uniqBy } from 'lodash';
import { CrudInfo, getCrudInfosForType, notNil } from '../utils';
import { CurrentUser } from '../../temp/current-user.decorator';
import { getFieldsToPopulate } from '../../temp/get-fields-to-populate';
import { GraphQLResolveInfo } from 'graphql';
import { findManyEntityArgs } from '../find-many-entity-args';
import { gqlFilterToMikro } from '../gql-filter-to-mikro-orm';

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
  }
};

export function ObjectRelationResolvers<T>(classRef: Type<T>): Type<any>[] {
  const crudFields = uniqBy(getCrudInfosForType(classRef), (f) => f.name);
  const classes = crudFields
    .map((crudInfo) => {
      const filterDesignType = getDesignType(crudInfo);
      if (!filterDesignType) {
        return;
      }

      const FindManyArgs = findManyEntityArgs(filterDesignType);
      @Resolver(() => classRef, { isAbstract: true })
      class AbstractResolver {
        constructor(protected readonly em: EntityManager) {}

        @ResolveField(() => [filterDesignType], {
          name: crudInfo.schemaName,
          nullable: false,
        })
        [crudInfo.schemaName](
          @Parent() parent: any,
          @Info() info: GraphQLResolveInfo,
          @CurrentUser() currentUser: any,
          @Args({ type: () => FindManyArgs }) input: any,
        ) {
          const populate = getFieldsToPopulate(info, classRef) as string[];
          populate
            .filter((p) => p.startsWith(`${crudInfo.schemaName}.`))
            .map((p) => p.replace(`${crudInfo.schemaName}.`, ''));

          const crudInfos = getCrudInfosForType(classRef);
          const where =
            gqlFilterToMikro<T>(input.where, crudInfos, { currentUser }) || {};

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
      class RelationResolverClass extends AbstractResolver {}
      return RelationResolverClass as Type<any>;
    })
    .filter(notNil);

  return classes;
}
