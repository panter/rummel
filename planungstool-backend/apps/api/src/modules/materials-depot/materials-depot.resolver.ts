import { EntityManager } from '@mikro-orm/postgresql';
import {
  Args,
  Info,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  AppAsset,
  CreateOneResolver,
  CurrentUser,
  FindManyResolver,
  FindOneEntityWhereArgs,
  FindOneResolver,
  Public,
  ReferenceId,
  UpdateOneResolver,
  getFieldsToPopulate,
  resolveDeleteOne,
} from '@panter/nestjs-utils';

import { QueryOrder } from '@mikro-orm/core';
import { BadRequestException } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';
import { BuildingComponentState } from '../building-component/building-component.enum';
import { SearchRequestInterest } from '../search-request-interest/search-request-interest.entity';
import { Task } from '../task/task.entity';
import { MaterialsDepotAssetReference } from './entities/materials-depot-asset-reference.entity';
import { MaterialsDepot } from './entities/materials-depot.entity';

@Public()
@Resolver(() => MaterialsDepot)
export class MaterialsDepotResolver {
  constructor(private readonly em: EntityManager) {}

  @ResolveField(() => AppAsset, { nullable: true })
  async mainImage(@Parent() materialsDepot: MaterialsDepot): Promise<AppAsset> {
    const assets = (
      await this.em.find(
        MaterialsDepotAssetReference,
        { materialsDepot: { id: materialsDepot.id } },
        { populate: ['asset'], fields: ['asset.*'] },
      )
    ).filter((ref) => ref.asset.mimeType.startsWith('image/'));

    return materialsDepot.mainImage || assets?.[0]?.asset || null;
  }

  @ResolveField(() => AppAsset, { nullable: true })
  async mainImageId(
    @Parent() parent: MaterialsDepot,
  ): Promise<AppAsset | undefined> {
    await this.em.populate(parent, ['mainImage']);
    return parent.mainImage;
  }

  @ResolveField(() => ReferenceId, { nullable: true })
  async responsableUserId(
    @Parent() parent: MaterialsDepot,
  ): Promise<ReferenceId> {
    await this.em.populate(parent, ['responsableUser.id']);
    return parent.responsableUser;
  }

  @ResolveField(() => [ReferenceId], { nullable: true })
  async buildingComponentsIds(@Parent() parent: MaterialsDepot) {
    await this.em.populate(parent, ['buildingComponents.id']);
    return parent.buildingComponents || null;
  }

  @ResolveField(() => [String], { nullable: true })
  async searchInterests(@Parent() parent: MaterialsDepot) {
    const searchRequestInterests = await this.em.find(SearchRequestInterest, {
      buildingComponent: { materialsDepot: parent.id },
    });
    return searchRequestInterests.map((item) => item.searchRequest.id);
  }

  @ResolveField(() => [Task], { nullable: true })
  async tasks(
    @Parent() parent: MaterialsDepot,
    @Info() info: GraphQLResolveInfo,
  ) {
    return parent.tasks.matching({
      orderBy: [
        { closedAt: QueryOrder.DESC_NULLS_FIRST },
        { dueDate: QueryOrder.DESC },
      ],
      populate: getFieldsToPopulate(info, Task),
      connectionType: 'read',
    });
  }

  @Mutation(() => MaterialsDepot)
  async deleteOneMaterialsDepot(
    @Info() info: GraphQLResolveInfo,
    @CurrentUser() currentUser: any,
    @Args() data: FindOneEntityWhereArgs,
  ): Promise<MaterialsDepot | null> {
    const materialDepot = await this.em.findOne(
      MaterialsDepot,
      {
        id: data.where.id,
      },
      { populate: ['buildingComponents', 'buildingComponents.state'] },
    );

    if (!materialDepot) {
      throw new BadRequestException();
    }

    if (
      (materialDepot?.buildingComponents.getItems() || []).find(
        (bc) => bc.state !== BuildingComponentState.draft,
      )
    ) {
      throw new Error(
        'One of assigned building components missing status DRAFT',
      );
    }

    for (const buildingComponent of materialDepot.buildingComponents) {
      this.em.remove(buildingComponent);
    }

    return resolveDeleteOne(MaterialsDepot, data, {
      info,
      currentUser,
      em: this.em,
    });
  }
}

@Resolver(() => MaterialsDepot)
export class MaterialsDepotFindOneResolver extends FindOneResolver(
  MaterialsDepot,
) {}

@Resolver(() => MaterialsDepot)
export class MaterialsDepotFindManyResolver extends FindManyResolver(
  MaterialsDepot,
) {}

@Resolver(() => MaterialsDepot)
export class MaterialsDepotCreateOneResolver extends CreateOneResolver(
  MaterialsDepot,
) {}

@Resolver(() => MaterialsDepot)
export class MaterialsDepotUpdateOneResolver extends UpdateOneResolver(
  MaterialsDepot,
) {}
