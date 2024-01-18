import {
  TypedDocumentNode,
  QueryHookOptions,
  OperationVariables,
} from '@apollo/client';
import { isArray } from 'lodash';
import { useCallback, useMemo } from 'react';
import { TablePaginationConfig } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';
import {
  ExtractOrderByVariable,
  ExtractWhereVariable,
  usePrismaManyQuery,
} from '@panter/react-forms';

const transformToObject = (input: string, value: string) => {
  const properties = input.split('.');
  const result: Record<string, any> = {};

  let currentLevel = result;

  properties.forEach((property, index) => {
    currentLevel[property] = index === properties.length - 1 ? value : {};
    currentLevel = currentLevel[property];
  });

  return result as any;
};

export function useAntPrismaManyQuery<
  TResult,
  TVariables extends OperationVariables,
>(
  query: TypedDocumentNode<TResult, TVariables>,
  countFromQuery: (data: TResult) => number,
  initialVariables?: {
    orderBy?: ExtractOrderByVariable<TVariables>;
    where?: ExtractWhereVariable<TVariables>;
    pageSize?: number;
    take?: number;
    skip?: boolean;
    skipOnEmptyFilter?: boolean;
  },
  queryOptions?: QueryHookOptions<TResult>,
) {
  const {
    setOrderBy,
    setPageSize,
    queryResult,
    where,
    setWhere,
    orderBy,
    pageSize,
    pagination,
    setTake,
    take,
  } = usePrismaManyQuery(query, countFromQuery, initialVariables, queryOptions);

  const handleOrderByChange = useCallback(
    (sorter: SorterResult<TResult>) => {
      if (!sorter.order) {
        setOrderBy(undefined);
      } else {
        setOrderBy(
          transformToObject(
            `${sorter.field}`,
            sorter.order == 'descend' ? 'asc' : 'desc',
          ),
        );
      }
    },
    [setOrderBy],
  );

  const handlePaginationChange = useCallback(
    (pagination: TablePaginationConfig) => {
      setPageSize(pagination.current);
    },
    [setPageSize],
  );
  const handleTableChange = useCallback(
    (
      pagination: TablePaginationConfig,
      filters: any, // we do not support ant filters
      sorter: SorterResult<any> | SorterResult<any>[],
    ) => {
      handlePaginationChange(pagination);
      handleOrderByChange(isArray(sorter) ? sorter[0] : sorter);
    },
    [handleOrderByChange, handlePaginationChange],
  );

  const result = useMemo(
    () => ({
      queryResult,
      where,
      setWhere,
      orderBy,
      setOrderBy,
      pageSize,
      setPageSize,
      take,
      setTake,
      handleTableChange,
      pagination,
    }),
    [
      queryResult,
      where,
      setWhere,
      orderBy,
      setOrderBy,
      pageSize,
      setPageSize,
      take,
      setTake,
      handleTableChange,
      pagination,
    ],
  );
  return result;
}
