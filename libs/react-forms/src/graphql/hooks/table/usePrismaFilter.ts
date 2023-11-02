import { useCallback, useEffect } from 'react';

import { TypedDocumentNode } from '@apollo/client';
import { ExtractWhereVariable } from './usePrismaWhereVariableState';
export function usePrismaFilter<
  TData,
  TVariables extends { where?: any },
  Filter,
  Where = ExtractWhereVariable<TVariables>,
>({
  defaultWhere,
  filterToInput,
  filter,
  setFilter,
  setWhere,
}: {
  defaultWhere: Where;
  filterToInput: (f: Partial<Filter>) => Where;
  filter: Partial<Filter>;
  setFilter: (f: Partial<Filter>) => void;
  query: TypedDocumentNode<TData, TVariables>;
  setWhere: (where: Where) => void;
}) {
  const applyFilter = useCallback(
    (filter: Partial<Filter>) => {
      if (!filter) {
        setFilter({});
        setWhere(defaultWhere);
      } else {
        const where = filterToInput(filter);
        setFilter(filter);
        setWhere({ ...where });
      }
    },
    [filterToInput, setFilter, setWhere, defaultWhere],
  );

  useEffect(() => {
    if (filter) {
      const where = filterToInput(filter);
      setWhere({ ...where });
    }
  }, []);

  return [filter, applyFilter] as const;
}
