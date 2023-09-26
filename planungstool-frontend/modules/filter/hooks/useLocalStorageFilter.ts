import { useLocalStorage } from 'react-use';
import { ExtractWhereVariable } from '../../table/hooks/usePrismaWhereVariable';
import { TypedDocumentNode } from '@apollo/client';
import { useFilter } from './useFilter';
import { useRouter } from 'next/router';

type BaseLocalStorageFilterProps<
  TData,
  TVariables extends { where?: any },
  Filter,
  Where = ExtractWhereVariable<TVariables>,
> = {
  defaultWhere: Where;
  filterToInput: (f: Partial<Filter>) => Where;
  initialFilter?: Partial<Filter>;
  query: TypedDocumentNode<TData, TVariables>;
  setWhere: (where: Where) => void;
};

export function useLocalStorageWithPathnameFilter<
  TData,
  TVariables extends { where?: any },
  Filter,
  Where = ExtractWhereVariable<TVariables>,
>({
  ...filterProps
}: BaseLocalStorageFilterProps<TData, TVariables, Filter, Where>) {
  const router = useRouter();

  return useLocalStorageFilter({
    storageKey: router.pathname,
    ...filterProps,
  });
}

export function useLocalStorageFilter<
  TData,
  TVariables extends { where?: any },
  Filter,
  Where = ExtractWhereVariable<TVariables>,
>({
  storageKey,
  ...filterProps
}: BaseLocalStorageFilterProps<TData, TVariables, Filter, Where> & {
  storageKey: string;
}) {
  const [storedFilter = {}, setStoredFilter] = useLocalStorage<Partial<Filter>>(
    storageKey,
    filterProps.initialFilter || {},
  );

  return useFilter({
    ...filterProps,
    filter: storedFilter,
    setFilter: setStoredFilter,
  });
}
