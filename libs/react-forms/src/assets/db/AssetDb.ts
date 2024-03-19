export type AssetInfoInfoState =
  | 'scheduled'
  | 'uploading'
  // | 'uploaded'
  | 'failed';

export type AssetMeta = {
  [key: string]: any;
};
export interface AssetInfoEntity {
  id?: number;
  state: AssetInfoInfoState;
  name: string;
  lastModified: number;
  type: string;
  size: number;
  fileId: number;
  uploadedSize: number;
  referenceId: string;
  referenceName: string;
  uploadHandlerId: string;
  error?: string;
  meta?: AssetMeta;
}

export interface BlobEntity {
  id?: number;
  file: File;
}

export interface AssetDb {
  addFileToAssets(
    file: File,
    referenceId: string,
    referenceName: string,
    uploadHandlerId: string,
    meta?: AssetMeta,
  ): Promise<number>;
  allAssetsInfosForReference(handlerId: string): Promise<AssetInfoEntity[]>;
  allAssetsInfos(): Promise<AssetInfoEntity[]>;
  allScheduledAssetsInfos(): Promise<AssetInfoEntity[]>;
  getFileBufferForAsset(
    assetInfo: AssetInfoEntity,
  ): Promise<BlobEntity | undefined>;
  updateAssetInfoMeta(
    assetInfoEntity: AssetInfoEntity,
    meta: AssetMeta,
  ): Promise<void>;
  updateAssetInfoUploadState(
    assetInfoEntity: AssetInfoEntity,
    state: AssetInfoInfoState,
  ): Promise<void>;
  updateAssetInfoUploadFailedState(
    assetInfoEntity: AssetInfoEntity,
    error: string,
  ): Promise<void>;
  removeAssetInfo(assetInfoEntity: AssetInfoEntity): Promise<void>;
  reset(): Promise<void>;
}
