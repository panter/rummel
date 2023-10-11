import { Asset, AssetProvider } from '@rummel/asset-manager';

export class InMemoryAssetProvider extends AssetProvider {
  private readonly assets = new Map<string, Asset>();
  private readonly tenant: string;

  constructor(ownerId: string = 'unknown') {
    super();
    this.tenant = ownerId;
  }

  async getById(id: string, ownerId = this.tenant): Promise<Asset | undefined> {
    const asset = this.assets.get(id);
    if (asset?.ownerId !== this.tenant) return undefined;

    return asset;
  }

  async save(asset: Asset): Promise<void> {
    if (!asset.id) {
      throw new Error('Id is missing');
    }
    this.assets.set(asset.id, asset);
  }

  async getAllByIds(assetIds: string[]): Promise<Asset[]> {
    if (!assetIds.length) return [];

    const assets = Array.from(this.assets.values()).filter(
      (asset) => asset?.ownerId === this.tenant && assetIds.includes(asset.id),
    );

    return assets;
  }

  async getAll(): Promise<Asset[]> {
    const assets = Array.from(this.assets.values()).filter(
      (asset) => asset?.ownerId === this.tenant,
    );

    return assets;
  }
}
