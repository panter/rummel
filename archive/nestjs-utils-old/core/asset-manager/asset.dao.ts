import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Asset, AssetProvider } from '../../asset-manager';
import { AppAsset } from './app-asset.entity';

@Injectable()
export class AssetDao implements AssetProvider {
  constructor(private readonly em: EntityManager) {}

  async getById(id: string, ownerId: string): Promise<Asset | undefined> {
    const appAsset = await this.em.findOne(AppAsset, {
      id,
      tenant: ownerId,
    });
    if (appAsset) {
      return appAsset.toAsset();
    }
  }

  getAllByIds(assetIds: string[], ownerId: string): Promise<Asset[]> {
    return this.em
      .find(AppAsset, {
        id: { $in: assetIds },
        tenant: ownerId,
      })
      .then((assets) => assets.map((a) => a.toAsset()));
  }

  async save(asset: Asset): Promise<void> {
    const assetEntity = new AppAsset(asset.ownerId, asset);
    this.em.persist(assetEntity);
  }
}
