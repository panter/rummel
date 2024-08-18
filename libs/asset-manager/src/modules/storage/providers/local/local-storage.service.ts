import * as fsPromises from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';
import { resolve } from 'path';
import { AssetAccess } from '../../../asset';
import { StorageFile } from '../../interface';
import { StorageService } from '../../storage.service';

export interface LocalStorageConfig {
  folder: string;
}

export class LocalStorageService extends StorageService {
  private readonly rootFolder: string;

  constructor(config: LocalStorageConfig) {
    super();
    this.rootFolder = config.folder.startsWith('./')
      ? config.folder
      : `./${config.folder}`;
  }

  async init() {
    await this.ensureFolders();
  }

  async delete(path: string, access: AssetAccess): Promise<void> {
    return fsPromises.rm(this.getFullPath(access || AssetAccess.public, path));
  }

  async get(path: string, access: AssetAccess): Promise<StorageFile> {
    return fsPromises
      .readFile(this.getFullPath(access || AssetAccess.public, path))
      .then((buffer) => ({
        buffer,
      }));
  }

  async save(path: string, data: Buffer, access: AssetAccess): Promise<string> {
    const pathParts = path.split('/');
    if (pathParts.length > 1 && pathParts.length == 2) {
      await this.createFolderIfNotExists(
        this.getFullPath(access || AssetAccess.public, pathParts[0]),
      );
    } else {
      throw new Error(
        `Path too long '${path}'. Maximum supported nesting level is 2.`,
      );
    }

    const filePath = this.getFullPath(access || AssetAccess.public, path);
    await fsPromises.writeFile(filePath, data);
    // using resolve might be security issue but "local" storage is mentioned only to be used for development
    return resolve(filePath);
  }

  async copy(
    path: string,
    newPath: string,
    access: AssetAccess,
  ): Promise<string> {
    const filePath = this.getFullPath(access || AssetAccess.public, path);
    const newFilePath = this.getFullPath(access || AssetAccess.public, newPath);
    await fsPromises.copyFile(filePath, newFilePath);
    return resolve(newFilePath);
  }

  async getDownloadUrl(path: string, expires: string, access: AssetAccess) {
    return `file://${this.getFullPath(access || AssetAccess.public, path)}`;
  }

  private async ensureFolders() {
    await this.createFolderIfNotExists(this.rootFolder);
    for (const access of [AssetAccess.private, AssetAccess.public]) {
      await this.createFolderIfNotExists(this.getFullPath(access));
    }
  }

  private getFullPath(access: AssetAccess, filePath?: string) {
    return path.join(
      ...[this.rootFolder, access, filePath].filter((v): v is string => !!v),
    );
  }

  private async createFolderIfNotExists(path: string): Promise<void> {
    const exists = fs.existsSync(path);
    if (!exists) {
      await fsPromises.mkdir(path);
    }
  }
}
