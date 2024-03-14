import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback, useMemo, useRef } from 'react';
import { isNumber } from 'lodash';
import { InMemoryAssetsDb } from '../db/InMemoryAssetsDb';
import { useInMemoryAssetDbQuery } from './useInMemoryAssetDbQuery';
import { AssetDb } from '../db/AssetDb';

/**
 * Custom hook to manage polling intervals and conditions for Apollo queries based on the presence of asset to upload.
 *
 * This hook is designed to control the polling mechanism dynamically. It starts polling when there are assetInfos
 * provided and stops polling when the assetInfos array is empty.
 *
 * @param assetDb - The asset database to query for assetInfos.
 *
 * @returns  An object containing configuration options for Apollo queries, including:
 *  - pollInterval: The interval in milliseconds at which the polling should occur. Set to 5000 ms by default.
 *  - notifyOnNetworkStatusChange: Must be true to force onCompleted to be called.
 *  - skipPollAttempt: Do not poll if there there aren't any assets to upload.
 *  - onCompleted: Check if there are uploads, to decide if we continue to poll.
 */
export const useAssetPolling = (
  assetDb: AssetDb,
  options?: { pollInterval?: number },
) => {
  // Use both indexed and in-memory asset as we don't know the type of the assetDb
  const inMemoryFallback = useMemo(() => new InMemoryAssetsDb(), []);
  const indexedAssetsInfos = useLiveQuery(() =>
    assetDb.allScheduledAssetsInfos(),
  );

  const allAssetInfos = useCallback(
    () => assetDb.allScheduledAssetsInfos(),
    [assetDb],
  );

  const allInMemory = useInMemoryAssetDbQuery(
    assetDb instanceof InMemoryAssetsDb ? assetDb : inMemoryFallback,
    allAssetInfos,
  );

  const assetInfos = indexedAssetsInfos || allInMemory;

  const skipRef = useRef(!assetInfos?.length);

  if (assetInfos?.length) {
    skipRef.current = false;
  }

  return {
    pollInterval: isNumber(options?.pollInterval) ? options.pollInterval : 5000,
    notifyOnNetworkStatusChange: true, //force onComplete while polling
    skipPollAttempt: () => (assetInfos?.length ? false : skipRef.current),
    onCompleted: () => {
      skipRef.current = !assetInfos?.length;
    },
    Range,
  };
};
