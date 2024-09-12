import { Asset } from './asset';
import { AssetProvider } from './asset-provider';
import { StorageService } from '../storage';
import {
  AssetAccess,
  CreatedAsset,
  DownloadedAsset,
  NewAssetFile,
} from './interface';
import { AssetNotFoundException } from './asset-not-found.exception';
import { UnknownException } from '@panter/nestjs-utils';

export class AssetService<S extends AssetProvider> {
  protected readonly assetProvider: S;
  protected readonly storageService: StorageService;

  constructor(assetProvider: S, storageService: StorageService) {
    this.assetProvider = assetProvider;
    this.storageService = storageService;
  }

  async download(assetId: string, ownerId: string): Promise<DownloadedAsset> {
    const asset = await this.assetProvider.getById(assetId, ownerId);
    if (!asset) {
      throw new AssetNotFoundException(assetId);
    }

    const file = await this.storageService.get(asset.getName(), asset.access);
    return new DownloadedAsset({
      id: asset.id,
      name: asset.getName(),
      size: asset.size,
      mimeType: asset.mimeType,
      publicUrl: asset.access == AssetAccess.public ? asset.url : undefined,
      buffer: file.buffer,
    });
  }

  async upload(
    file: NewAssetFile,
    storage: string,
    access: AssetAccess,
    ownerId: string,
  ): Promise<CreatedAsset> {
    try {
      const asset = Asset.create(
        file.name,
        file.mimeType,
        file.size,
        storage,
        ownerId,
        access,
      );

      asset.url = await this.storageService.save(
        asset.getName(),
        file.buffer,
        access,
      );
      await this.assetProvider.save(asset);
      return new CreatedAsset({
        id: asset.id,
        name: asset.getName(),
        size: asset.size,
        mimeType: asset.mimeType,
        publicUrl: asset.access == AssetAccess.public ? asset.url : undefined,
      });
    } catch (e) {
      throw new UnknownException('Unable to create asset', e);
    }
  }

  async confirm(assetId: string, ownerId: string): Promise<Asset> {
    const asset = await this.assetProvider.getById(assetId, ownerId);
    if (!asset) {
      throw new AssetNotFoundException(assetId);
    }
    asset.confirm();
    await this.assetProvider.save(asset);
    return asset;
  }

  async getAllByIds(assetIds: string[], ownerId: string): Promise<Asset[]> {
    return this.assetProvider.getAllByIds(assetIds, ownerId);
  }

  async copy(assetId: string, ownerId: string): Promise<Asset> {
    const asset = await this.assetProvider.getById(assetId, ownerId);
    if (!asset) {
      throw new AssetNotFoundException(assetId);
    }
    const assetCopy = Asset.create(
      asset.originalFilename,
      asset.mimeType,
      asset.size,
      asset.storage,
      ownerId,
      asset.access,
    );
    assetCopy.url = await this.storageService.copy(
      asset.getName(),
      assetCopy.getName(),
      asset.access,
    );
    // await this.assetProvider.save(assetCopy);
    return assetCopy;
  }
}
