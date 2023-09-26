import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import {
  AppAsset,
  CreateOneResolver,
  FindManyResolver,
  FindOneResolver,
  Public,
  UpdateOneResolver,
} from '@panter/nestjs-utils';
import { StorageLocation } from './storage-location.entity';
import { MaterialsDepotAssetReference } from '../materials-depot/entities/materials-depot-asset-reference.entity';
import { EntityManager } from '@mikro-orm/postgresql';

@Public()
@Resolver(() => StorageLocation)
export class StorageLocationResolver {
  constructor(private readonly em: EntityManager) {}

  @ResolveField(() => AppAsset, { nullable: true })
  async mainImage(
    @Parent() storageLocation: StorageLocation,
  ): Promise<AppAsset> {
    const assets = (
      await this.em.find(
        MaterialsDepotAssetReference,
        { materialsDepot: { id: storageLocation.id } },
        { populate: ['asset'], fields: ['asset.*'] },
      )
    ).filter((ref) => ref.asset.mimeType.startsWith('image/'));

    return storageLocation.mainImage || assets?.[0]?.asset || null;
  }

  @ResolveField(() => AppAsset, { nullable: true })
  async mainImageId(
    @Parent() parent: StorageLocation,
  ): Promise<AppAsset | undefined> {
    await this.em.populate(parent, ['mainImage']);
    return parent.mainImage;
  }
}

@Resolver(() => StorageLocation)
export class StorageLocationFindOneResolver extends FindOneResolver(
  StorageLocation,
) {}

@Resolver(() => StorageLocation)
export class StorageLocationFindManyResolver extends FindManyResolver(
  StorageLocation,
) {}

@Resolver(() => StorageLocation)
export class StorageLocationCreateOneResolver extends CreateOneResolver(
  StorageLocation,
) {}

@Resolver(() => StorageLocation)
export class StorageLocationUpdateOneResolver extends UpdateOneResolver(
  StorageLocation,
) {}
