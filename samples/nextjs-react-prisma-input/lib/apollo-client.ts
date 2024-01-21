import { ApolloClient, InMemoryCache } from '@apollo/client';

import generatedIntrospection from '../@generated/fragment-matcher';
import { StrictTypedTypePolicies } from '../@generated/type-policies';
import { PublicRuntimeConfig } from './config';
import { autocompleteTypePolicies } from '../modules/autocomplete/typePolicy';
import { merge } from 'lodash';

// configure type policies
const typePolicies: StrictTypedTypePolicies = {};
merge(typePolicies, autocompleteTypePolicies);

export const apolloClient = new ApolloClient({
  uri: `${PublicRuntimeConfig.getOrThrow('GRAPHQL_ENDPOINT')}/graphql`,
  credentials: 'include',
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache({
    possibleTypes: generatedIntrospection.possibleTypes,
    typePolicies,
  }),
});
