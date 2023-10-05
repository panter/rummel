import { AssetAccess } from '../asset';
import { StorageFile } from './interface';

// tslint:disable-next-line:no-unsafe-declaration-merging
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface StorageService {
  init?(): Promise<void>;
}

// tslint:disable-next-line:no-unsafe-declaration-merging
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export abstract class StorageService {
  abstract save(
    path: string,
    data: Buffer,
    access: AssetAccess,
  ): Promise<string>;

  abstract delete(path: string, access: AssetAccess): Promise<void>;

  abstract get(path: string, access: AssetAccess): Promise<StorageFile>;

  abstract copy(
    path: string,
    newPath: string,
    access: AssetAccess,
  ): Promise<string>;
}
