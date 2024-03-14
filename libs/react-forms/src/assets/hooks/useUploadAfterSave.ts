import { useCallback, useState } from 'react';
import { AssetDb } from '../db/AssetDb';
import { InMemoryAssetsDb } from '../db/InMemoryAssetsDb';

/**
 * A custom hook that provides functionality to upload assets from a local in-memory database to a global asset database.
 * This hook is designed to be used in scenarios where assets are initially stored in a temporary, in-memory database
 * and need to be moved to a persistent, global database after a certain action, typically a "save" operation.
 *
 * The hook initializes a local instance of an in-memory assets database upon the component's mount and exposes
 * a method to upload all scheduled assets from this local database to the global asset database. After the upload,
 * the local in-memory database is reset, clearing all temporary data.
 *
 * @returns An object containing:
 * - `localAssetDb`: An instance of the in-memory assets database for temporary storage of assets before they are saved.
 * - `uploadAssetsAfterSave`: An asynchronous function that takes an object with `referenceId` and `referenceName` properties.
 *   This function uploads all assets from the local in-memory database to the global asset database using the provided
 *   reference information. After successful upload, the local database is reset.
 *
 * @example
 * // In a component that handles asset uploads:
 * const { localAssetDb, uploadAssetsAfterSave } = useUploadAssetsAfterSave();
 *
 * // To add a file to the local in-memory database (e.g., in a file input onChange handler):
 * localAssetDb.addFileToAssets(file, referenceId, referenceName, uploadHandlerId, meta);
 *
 * // To upload all assets to the global database after a save action:
 * const handleSave = async () => {
 *   void uploadAssetsAfterSave({ referenceId: '123', referenceName: 'ProjectX' });
 * };
 */
export const useUploadAssetsAfterSave = (assetDb: AssetDb) => {
  const [localAssetDb] = useState(new InMemoryAssetsDb());

  const uploadAssetsAfterSave = useCallback(
    async (data: { referenceId: string; referenceName: string }) => {
      const newAssets = await localAssetDb.allScheduledAssetsInfos();
      for (const newAsset of newAssets || []) {
        const file = await localAssetDb.getFileBufferForAsset(newAsset);
        if (!file) {
          return;
        }
        const { referenceId, referenceName } = data;
        void assetDb.addFileToAssets(
          file?.file,
          referenceId,
          referenceName,
          newAsset.uploadHandlerId,
          newAsset.meta,
        );
      }
      localAssetDb.reset();
    },
    [assetDb, localAssetDb],
  );

  return {
    localAssetDb,
    uploadAssetsAfterSave,
  };
};
