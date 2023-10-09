import {
  ExtractOrderByVariable,
  usePrismaOrderByVariable,
} from './usePrismaOrderByVariable';
import {
  ExtractWhereVariable,
  usePrismaWhereVariable,
} from './usePrismaWhereVariable';
import { TypedDocumentNode, useQuery } from '@apollo/client';
import { isArray, isEmpty } from 'lodash';
import { useCallback, useMemo, useState } from 'react';

import { SortOrder } from '../../../@generated/graphql';
import { SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd';

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

export function usePrismaManyTable<TResult, TVariables>(
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
) {
  const [where, setWhere] = usePrismaWhereVariable(
    query,
    initialVariables?.where,
  );
  const [orderBy, setOrderBy] = usePrismaOrderByVariable(
    query,
    initialVariables?.orderBy,
  );
  const [pageSize, setPageSize] = useState<number | undefined>(
    initialVariables?.pageSize,
  );
  const [take, setTake] = useState<number | undefined>(initialVariables?.take);

  const queryResult = useQuery(query, {
    variables: {
      where,
      orderBy,
      skip:
        pageSize !== undefined && take !== undefined
          ? (pageSize - 1) * take
          : undefined,
      take,
    },
    skip:
      initialVariables?.skip ||
      (initialVariables?.skipOnEmptyFilter && isEmpty(where)),
    fetchPolicy: 'cache-and-network',
  });

  const handleOrderByChange = useCallback(
    (sorter: SorterResult<TResult>) => {
      if (!sorter.order) {
        setOrderBy(undefined);
      } else {
        setOrderBy(
          transformToObject(
            `${sorter.field}`,
            sorter.order == 'descend' ? SortOrder.Desc : SortOrder.Asc,
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

  const totalCount = queryResult?.data ? countFromQuery(queryResult.data) : 0;
  const pagination = useMemo<TablePaginationConfig>(
    () => ({
      total: totalCount,
      current: pageSize,
      pageSize: take,
      showSizeChanger: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalCount, pageSize],
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
      setWhere,
      where,
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
