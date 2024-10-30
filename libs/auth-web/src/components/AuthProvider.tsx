import {
  ApolloClient,
  NormalizedCacheObject,
  OperationVariables,
} from '@apollo/client';
import React, { PropsWithChildren } from 'react';
import { DataProvider } from './DataProvider';
import { AuthTokenProvider } from './AuthTokenProvider';
import { AuthDataProvider } from './AuthDataProvider';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export type AuthStrategy = 'firebase' | 'local';

type AuthProviderProps<TData, TVariables extends OperationVariables> = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  authStrategy: AuthStrategy;
  query: TypedDocumentNode<TData, TVariables>;
  parseData: (result: TData) => any;
};

export const AuthProvider = <TData, TVariables extends OperationVariables>({
  apolloClient,
  authStrategy,
  query,
  parseData,
  children,
}: PropsWithChildren<AuthProviderProps<TData, TVariables>>) => {
  return (
    <AuthTokenProvider authStrategy={authStrategy}>
      <DataProvider authStrategy={authStrategy} apolloClient={apolloClient}>
        <AuthDataProvider
          authStrategy={authStrategy}
          query={query}
          parseData={parseData}
        >
          {children}
        </AuthDataProvider>
      </DataProvider>
    </AuthTokenProvider>
  );
};
