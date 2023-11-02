import { Alert, Spin } from 'antd';
import React from 'react';
import { FormQueryOptions } from '@panter/react-forms';

export interface QueryComponentProps {
  children: React.ReactNode;
  queryLoading?: boolean;
  queryData?: any;
  querySkip?: boolean;
}

export const WaitForQuery: React.FC<QueryComponentProps> = ({
  children,
  queryLoading,
  queryData,
  querySkip,
}) => {
  return queryLoading ? (
    <Spin />
  ) : (!queryLoading && queryData) || querySkip ? (
    <>{children}</>
  ) : (
    <Alert message="Could not load Data" />
  );
};

export type WaitForFormQueryProps = {
  children: React.ReactNode;
  queryInfo?: FormQueryOptions<any, any>;
};

export const WaitForFormQuery: React.FC<WaitForFormQueryProps> = ({
  queryInfo,
  children,
}) => (
  <WaitForQuery
    queryData={queryInfo?.model}
    queryLoading={queryInfo?.loadingModel}
    querySkip={queryInfo ? queryInfo.skipQuery : true}
  >
    {children}
  </WaitForQuery>
);
