import { sortBy } from 'lodash';
import {
  AssetDb,
  AssetInfoEntity,
  AssetInfoInfoState,
  AssetMeta,
  BlobEntity,
} from './AssetDb';

type Listener = () => void;

export class InMemoryAssetsDb implements AssetDb {
  private assetInfos: AssetInfoEntity[] = [];
  private files: BlobEntity[] = [];
  private listeners: Listener[] = [];

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private nextAssetInfosId() {
    if (this.assetInfos.length === 0) {
      return 1;
    }

    const currentHightestId =
      sortBy(this.assetInfos, 'id').reverse()[0]?.id || 0;
    return currentHightestId + 1;
  }

  private nextFilesId() {
    if (this.files.length === 0) {
      return 1;
    }
    const currentHightestId = sortBy(this.files, 'id').reverse()[0]?.id || 0;
    return currentHightestId + 1;
  }

  async addFileToAssets(
    file: File,
    referenceId: string,
    referenceName: string,
    uploadHandlerId: string,
    meta?: AssetMeta,
  ) {
    const fileId = this.files.push({ id: this.nextFilesId(), file });
    const assetInfoId = this.assetInfos.push({
      id: this.nextAssetInfosId(),
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

    this.notifyListeners();
    return assetInfoId;
  }

  async allAssetsInfos() {
    return sortBy(this.assetInfos, 'id').reverse();
  }

  async allScheduledAssetsInfos() {
    return sortBy(this.assetInfos, 'lastModified')
      .reverse()
      .filter((ai) => ai.state === 'scheduled');
  }

  async allAssetsInfosForReference(referenceId: string) {
    return sortBy(this.assetInfos, 'lastModified')
      .reverse()
      .filter((ai) => ai.referenceId === referenceId);
  }

  async getFileBufferForAsset(assetInfo: AssetInfoEntity) {
    return this.files.find((ai) => ai.id === assetInfo.fileId);
  }

  async updateAssetInfoMeta(assetInfoEntity: AssetInfoEntity, meta: AssetMeta) {
    if (assetInfoEntity.id) {
      const index = this.assetInfos.findIndex(
        (ai) => ai.id === assetInfoEntity.id,
      );
      if (index !== -1) {
        // Check if the assetInfoEntity was found
        // Update the item at the found index with the new meta merged into the existing meta
        this.assetInfos[index] = {
          ...assetInfoEntity,
          meta: { ...assetInfoEntity.meta, ...meta },
        };

        this.notifyListeners();
      }
    }
  }

  async updateAssetInfoUploadState(
    assetInfoEntity: AssetInfoEntity,
    state: AssetInfoInfoState,
  ) {
    if (assetInfoEntity.id) {
      this.assetInfos.splice(
        this.assetInfos.findIndex((ai) => ai.id === assetInfoEntity.id),
        1,
      );
      this.assetInfos.push({
        ...assetInfoEntity,
        state,
      });

      this.notifyListeners();
    }
  }

  async updateAssetInfoUploadFailedState(
    assetInfoEntity: AssetInfoEntity,
    error: string,
  ) {
    if (assetInfoEntity.id) {
      this.assetInfos.splice(
        this.assetInfos.findIndex((ai) => ai.id === assetInfoEntity.id),
        1,
      );
      this.assetInfos.push({
        ...assetInfoEntity,
        state: 'failed',
        error,
      });

      this.notifyListeners();
    }
  }

  async removeAssetInfo(assetInfoEntity: AssetInfoEntity) {
    if (assetInfoEntity.id) {
      this.assetInfos.splice(
        this.assetInfos.findIndex((ai) => ai.id === assetInfoEntity.id),
        1,
      );
      this.files.splice(
        this.files.findIndex((ai) => ai.id === assetInfoEntity.fileId),
        1,
      );

      this.notifyListeners();
    }
  }

  async reset() {
    this.assetInfos = [];
    this.files = [];
    this.notifyListeners();
  }
}
