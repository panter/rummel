import React, { PropsWithChildren, Suspense } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import dynamic from 'next/dynamic';
import { AuthStrategy } from './AuthProvider';

const FirebaseLinkContextProvider = dynamic(
  () =>
    import('./firebase/FirebaseProvider').then(
      (mod) => mod.FirebaseLinkContextProvider,
    ),
  {
    ssr: false,
  },
);

export const DataProvider: React.FC<
  PropsWithChildren<{
    apolloClient: ApolloClient<NormalizedCacheObject>;
    authStrategy: AuthStrategy;
  }>
> = ({ children, apolloClient, authStrategy }) => {
  return (
    <ApolloProvider client={apolloClient}>
      {authStrategy === 'firebase' ? (
        <Suspense fallback={null}>
          <FirebaseLinkContextProvider>{children}</FirebaseLinkContextProvider>
        </Suspense>
      ) : (
        children
      )}
    </ApolloProvider>
  );
};
