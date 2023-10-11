import { Asset, AssetProvider } from '@rummel/asset-manager';

export class InMemoryAssetProvider extends AssetProvider {
  private readonly assets = new Map<string, Asset>();

  async getById(id: string, ownerId: string): Promise<Asset> | undefined {
    const asset = this.assets.get(id);
    if (asset?.ownerId != ownerId) {
      return undefined;
    }
    return asset;
  }

  async save(asset: Asset): Promise<void> {
    if (!asset.id) {
      throw new Error('Id is missing');
    }
    this.assets.set(asset.id, asset);
  }

  getAllByIds(assetIds: string[], ownerId: string): Promise<Asset[]> {
    throw new Error('Method not implemented.');
  }
}
