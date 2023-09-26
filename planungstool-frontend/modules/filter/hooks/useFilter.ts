import { useCallback, useEffect, useState } from 'react';

import { ExtractWhereVariable } from '../../table/hooks/usePrismaWhereVariable';
import { TypedDocumentNode } from '@apollo/client';
export function useFilter<
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
  const setFilterAndWhere = useCallback(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [filter, setFilterAndWhere] as const;
}
