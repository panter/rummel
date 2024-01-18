import {
  TypedDocumentNode,
  useQuery,
  QueryHookOptions,
  OperationVariables,
} from '@apollo/client';
import { isEmpty } from 'lodash';
import { useMemo, useState } from 'react';
import {
  ExtractOrderByVariable,
  usePrismaOrderByVariable,
} from './usePrismaOrderByVariableState';
import {
  ExtractWhereVariable,
  usePrismaWhereVariable,
} from './usePrismaWhereVariableState';

type PaginationOptions = {
  total: number;
  current?: number;
  pageSize?: number;
};

export function usePrismaManyQuery<TResult, TVariables>(
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
    ...queryOptions,
  });

  const totalCount = queryResult?.data ? countFromQuery(queryResult.data) : 0;
  const pagination = useMemo<PaginationOptions>(
    () => ({
      total: totalCount,
      current: pageSize,
      pageSize: take,
      showSizeChanger: false,
    }),
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
      pagination,
    ],
  );
  return result;
}
