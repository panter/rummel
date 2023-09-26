import { Asset } from './asset';

export abstract class AssetProvider {
  abstract getById(id: string, ownerId: string): Promise<Asset | undefined>;

  abstract getAllByIds(assetIds: string[], ownerId: string): Promise<Asset[]>;

  abstract save(asset: Asset): Promise<void> | void;
}
