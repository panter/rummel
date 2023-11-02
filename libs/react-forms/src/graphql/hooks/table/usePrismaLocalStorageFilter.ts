import { useLocalStorage } from 'react-use';
import { TypedDocumentNode } from '@apollo/client';
import { ExtractWhereVariable } from './usePrismaWhereVariableState';
import { usePrismaFilter } from './usePrismaFilter';

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

export function usePrismaLocalStorageFilter<
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

  return usePrismaFilter({
    ...filterProps,
    filter: storedFilter,
    setFilter: setStoredFilter,
  });
}
