import { Injectable } from '@nestjs/common';
import {
  Asset,
  AssetAccess,
  AssetProvider,
  AssetService,
  NewAssetFile,
  StorageService,
} from '../../asset-manager';
import { AssetDao } from './asset.dao';
import { Transactional, UserIdentity } from '../../common';

@Injectable()
export class AssetManagerService extends AssetService<AssetDao> {
  constructor(assetProvider: AssetProvider, storageService: StorageService) {
    super(assetProvider as AssetDao, storageService);
  }

  @Transactional()
  async confirmAsset(
    assetId: string,
    currentUser: UserIdentity,
  ): Promise<Asset> {
    return this.confirm(assetId, currentUser.getTenantId());
  }

  @Transactional()
  async uploadAsset(
    file: NewAssetFile,
    storage: string,
    access: AssetAccess,
    currentUser: any,
  ) {
    return this.upload(file, storage, access, currentUser.getTenantId());
  }

  @Transactional()
  async copyAsset(assetId: string, ownerId: string): Promise<Asset> {
    return this.copy(assetId, ownerId);
  }
}
