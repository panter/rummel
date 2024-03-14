import Dexie from 'dexie';
import {
  AssetDb,
  AssetInfoEntity,
  AssetInfoInfoState,
  AssetMeta,
  BlobEntity,
} from './AssetDb';

export class IndexedAssetsDb extends Dexie implements AssetDb {
  private assetInfos!: Dexie.Table<AssetInfoEntity, number>;
  private files!: Dexie.Table<BlobEntity, number>;

  constructor() {
    super('Assets');

    //
    // Define tables and indexes
    // (Here's where the implicit table props are dynamically created)
    //
    this.version(1).stores({
      assetInfos: '++id, name, state, size, lastModified, fileId',
      files: '++id',
    });
  }

  async addFileToAssets(
    file: File,
    referenceId: string,
    referenceName: string,
    uploadHandlerId: string,
    meta?: AssetMeta,
  ) {
    return this.transaction('rw', [this.assetInfos, this.files], async () => {
      const fileId = await this.files.add({ file });
      const assetInfoId = await this.assetInfos.add({
        state: 'scheduled',
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        fileId,
        referenceId,
        referenceName,
        uploadHandlerId,
        uploadedSize: 0,
        meta,
      });

      return assetInfoId;
    });
  }

  allAssetsInfos() {
    return this.assetInfos.orderBy('lastModified').reverse().toArray();
  }

  async allScheduledAssetsInfos() {
    return this.assetInfos
      .orderBy('lastModified')
      .filter((ai) => ai.state === 'scheduled')
      .reverse()
      .toArray();
  }

  async allAssetsInfosForReference(referenceId: string) {
    return this.assetInfos
      .orderBy('lastModified')
      .reverse()
      .filter((ai) => ai.referenceId === referenceId)
      .toArray();
  }

  async getFileBufferForAsset(assetInfo: AssetInfoEntity) {
    return this.files.get(assetInfo.fileId);
  }

  async updateAssetInfoMeta(assetInfoEntity: AssetInfoEntity, meta: AssetMeta) {
    this.transaction('rw', [this.assetInfos], async () => {
      if (assetInfoEntity.id) {
        await this.assetInfos.put(
          {
            ...assetInfoEntity,
            meta: {
              ...assetInfoEntity.meta,
              ...meta,
            },
          },
          assetInfoEntity.id,
        );
      }
    });
  }

  async updateAssetInfoUploadState(
    assetInfoEntity: AssetInfoEntity,
    state: AssetInfoInfoState,
  ) {
    this.transaction('rw', [this.assetInfos], async () => {
      if (assetInfoEntity.id) {
        await this.assetInfos.put(
          {
            ...assetInfoEntity,
            state,
          },
          assetInfoEntity.id,
        );
      }
    });
  }

  async updateAssetInfoUploadFailedState(
    assetInfoEntity: AssetInfoEntity,
    error: string,
  ) {
    this.transaction('rw', [this.assetInfos], async () => {
      if (assetInfoEntity.id) {
        await this.assetInfos.put(
          {
            ...assetInfoEntity,
            state: 'failed',
            error,
          },
          assetInfoEntity.id,
        );
      }
    });
  }

  async removeAssetInfo(assetInfoEntity: AssetInfoEntity) {
    this.transaction('rw', [this.assetInfos, this.files], async () => {
      if (assetInfoEntity.id) {
        await this.assetInfos.delete(assetInfoEntity.id);
        await this.files.delete(assetInfoEntity.fileId);
      }
    });
  }

  async reset() {
    return this.transaction('rw', this.assetInfos, this.files, async () => {
      await Promise.all(this.tables.map((table) => table.clear()));
    });
  }
}
