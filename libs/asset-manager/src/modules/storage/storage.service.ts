import { AssetAccess } from '../asset';
import { StorageFile } from './interface';

export interface StorageService {
  init?(): Promise<void>;
}

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
