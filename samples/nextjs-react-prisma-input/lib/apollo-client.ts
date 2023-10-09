import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import { createUploadLink } from 'apollo-upload-client';
import generatedIntrospection from '../@generated/fragment-matcher';
import { StrictTypedTypePolicies } from '../@generated/type-policies';
import { PublicRuntimeConfig } from './config';

const typePolicies: StrictTypedTypePolicies = {};

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    createUploadLink({
      uri: `${PublicRuntimeConfig.getOrThrow('GRAPHQL_ENDPOINT')}/graphql`,
      credentials: 'include',
    }),
  ]),
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache({
    possibleTypes: generatedIntrospection.possibleTypes,
    typePolicies,
  }),
});
