import { EntityManager } from '@mikro-orm/postgresql';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import {
  AppAsset,
  CreateOneResolver,
  DeleteOneResolver,
  FindManyResolver,
  FindOneResolver,
  Public,
  ReferenceId,
  UpdateOneResolver,
} from '@panter/nestjs-utils';
import { BuildingComponent } from './entities/building-component.entity';
import { BuildingComponentAssetReference } from './entities/building-component-asset-reference.entity';

@Public()
@Resolver(() => BuildingComponent)
export class BuildingComponentResolver {
  constructor(private readonly em: EntityManager) {}

  @ResolveField(() => ReferenceId, { nullable: true })
  async materialsDepotId(
    @Parent() parent: BuildingComponent,
  ): Promise<ReferenceId> {
    await this.em.populate(parent, ['materialsDepot.id']);
    return parent.materialsDepot || null;
  }

  @ResolveField(() => ReferenceId, { nullable: true })
  async categoryId(@Parent() parent: BuildingComponent) {
    await this.em.populate(parent, ['category.id']);
    return parent.category || null;
  }

  @ResolveField(() => ReferenceId, { nullable: true })
  async storageLocationId(@Parent() parent: BuildingComponent) {
    await this.em.populate(parent, ['storageLocation.id']);
    return parent.storageLocation || null;
  }

  @ResolveField(() => ReferenceId, { nullable: true })
  async ebkphCategoryId(@Parent() parent: BuildingComponent) {
    await this.em.populate(parent, ['ebkphCategory.id']);
    return parent.ebkphCategory || null;
  }

  @ResolveField(() => AppAsset, { nullable: true })
  async mainImage(
    @Parent() buildingComponent: BuildingComponent,
  ): Promise<AppAsset> {
    const assets = (
      await this.em.find(
        BuildingComponentAssetReference,
        { buildingComponent: { id: buildingComponent.id } },
        { populate: ['asset'], fields: ['asset.*'] },
      )
    ).filter((ref) => ref.asset.mimeType.startsWith('image/'));

    return buildingComponent.mainImage || assets?.[0]?.asset || null;
  }

  @ResolveField(() => AppAsset, { nullable: true })
  async mainImageId(
    @Parent() parent: BuildingComponent,
  ): Promise<AppAsset | undefined> {
    await this.em.populate(parent, ['mainImage']);
    return parent.mainImage;
  }
}

@Resolver(() => BuildingComponent)
export class BuildingComponentFindOneResolver extends FindOneResolver(
  BuildingComponent,
) {}

@Resolver(() => BuildingComponent)
export class BuildingComponentFindManyResolver extends FindManyResolver(
  BuildingComponent,
) {}

@Resolver(() => BuildingComponent)
export class BuildingComponentCreateOneResolver extends CreateOneResolver(
  BuildingComponent,
) {}

@Resolver(() => BuildingComponent)
export class BuildingComponentUpdateOneResolver extends UpdateOneResolver(
  BuildingComponent,
) {}

@Resolver(() => BuildingComponent)
export class BuildingComponentDeleteOneResolver extends DeleteOneResolver(
  BuildingComponent,
) {}
