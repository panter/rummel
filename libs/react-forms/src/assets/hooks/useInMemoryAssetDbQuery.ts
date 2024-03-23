import { useEffect, useState } from 'react';
import { InMemoryAssetsDb } from '../db/InMemoryAssetsDb';

/**
 * A custom hook for querying data from an in-memory assets database and subscribing to updates.
 * @param assetDb The in-memory database instance to subscribe to for updates.
 * @param fetchData A function that fetches the data asynchronously, please use useCallback to memoize it.
 * @param Optional dependencies array to control the effect's re-execution.
 * @returns The fetched data, or undefined if the data hasn't been fetched yet.
 */
export function useInMemoryAssetDbQuery<T>(
  assetDb: InMemoryAssetsDb,
  fetchData: () => Promise<T>,
  deps?: any[],
) {
  const [data, setData] = useState<T>();
  useEffect(() => {
    const updateData = async () => {
      const newData = await fetchData();
      setData(newData);
    };

    updateData();

    const unsubscribe = assetDb.subscribe(() => {
      updateData();
    });

    return unsubscribe;
  }, [assetDb, ...(deps || [])]);

  return data;
}
