import { useLiveQuery } from 'dexie-react-hooks';
import { AssetDb, AssetInfoEntity } from '../db/AssetDb';
import { InMemoryAssetsDb } from '../db/InMemoryAssetsDb';
import { IndexedAssetsDb } from '../db/IndexedAssetsDb';
import { useInMemoryAssetDbQuery } from '../hooks/useInMemoryAssetDbQuery';

type AssetDbQueryProps<T> = {
  fetchData: () => Promise<T>;
  children: (data: T | undefined) => JSX.Element;
  filter?: (
    assetInfos: AssetInfoEntity,
    index: number,
    all: AssetInfoEntity[],
  ) => boolean;
  deps?: any[];
};

type InMemoryAssetsDbProps<T> = AssetDbQueryProps<T> & {
  assetDb: InMemoryAssetsDb;
};

function InMemoryAssetsDbComponent<T>({
  assetDb,
  fetchData,
  deps,
  children,
}: InMemoryAssetsDbProps<T>) {
  const data = useInMemoryAssetDbQuery(assetDb, fetchData, deps);
  return children(data);
}

function IndexedAssetsDbComponent<T>({
  fetchData,
  deps,
  children,
}: AssetDbQueryProps<T>) {
  const data = useLiveQuery(fetchData, [fetchData, ...(deps || [])]);

  return children(data);
}

/**
 * A component that abstracts the querying of asset databases, rendering the result using the provided
 * children render prop. It supports both in-memory and indexed DBs by internally choosing the appropriate
 * method based on the `assetDb` instance type. This component requires the `fetchData` function to be
 * memoized using `useCallback` to prevent unnecessary re-fetches or re-renders.
 *
 * !!
 * Only use this component if you need the abstraction from in-memory and indexed db.
 * Else use the dedicated hooks -> useInMemoryAssetDbQuery or useLiveQuery.
 * !!
 *
 * @param props The combined props for asset database querying,
 * including a memoized `fetchData` function, an `assetDb` instance for querying, and optional dependencies
 * array `deps` to control re-execution of the fetch operation.
 * @returns The rendered element from the children callback function, or null if the assetDb
 * type is unsupported or if there is an issue with the query.
 *
 * @example
 * // Define the fetchData function, memoized with useCallback to ensure it does not trigger unnecessary
 * // re-renders or re-fetches. The dependencies array for useCallback should include all variables
 * // that the fetchData function depends on, which, in this case, are `assetDb` and `filter`.
 * const fetchData = useCallback(async () => {
 *   const all = await assetDb.allAssetsInfos();
 *   return all.filter(getFilterPredicate(filter));
 * }, [assetDb, filter]);
 *
 * // Use the AssetDbQuery component with the memoized fetchData function. The `deps` prop is optional
 * // and can be used to specify any additional dependencies that should trigger a re-fetch when changed.
 * <AssetDbQuery
 *   assetDb={yourAssetDbInstance}
 *   fetchData={fetchData}
 *   deps={[dependency1]}
 * >
 *   {(data) => (
 *     <div>{data ? `Data: ${data}` : 'No data found'}</div>
 *   )}
 * </AssetDbQuery>
 */
export function AssetDbQuery<T>({
  assetDb,
  filter,
  ...props
}: AssetDbQueryProps<T> & { assetDb: AssetDb }) {
  if (assetDb instanceof InMemoryAssetsDb) {
    return <InMemoryAssetsDbComponent {...props} assetDb={assetDb} />;
  } else if (assetDb instanceof IndexedAssetsDb) {
    return <IndexedAssetsDbComponent {...props} />;
  }
  throw new Error('Component assetDb type not found.');
}
