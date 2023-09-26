import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import { PublicRuntimeConfig } from './config';
import { StrictTypedTypePolicies } from '../@generated/type-policies';
import cookie from 'js-cookie';
import { createUploadLink } from 'apollo-upload-client';
import generatedIntrospection from '../@generated/fragment-matcher';
import { get, merge } from 'lodash';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { materialsDepotTypePolicies } from '../modules/materials-depot/typePolicy';
import { autocompleteTypePolicies } from '../modules/autocomplete/typePolicy';
import { buildingComponentTypePolicies } from '../modules/building-component/typePolicy';
import { categoryTypePolicies } from '../modules/category/typePolicy';
import { ebkphCategoryTypePolicies } from '../modules/ebkphCategory/typePolicy';
import { materialsDepotTimelineTypePolicies } from '../modules/materials-depot-timeline/typePolicy';
import { projectTypePolicies } from '../modules/project/typePolicy';
import { searchRequestTypePolicies } from '../modules/search-request/typePolicy';
import { searchRequestInterestTypePolicies } from '../modules/search-request-interest/typePolicy';
import { storageLocationTypePolicies } from '../modules/storage-location/typePolicy';
import { taskTypePolicies } from '../modules/task/typePolicy';
import { userTypePolicies } from '../modules/user/typePolicy';

const typePolicies: StrictTypedTypePolicies = {};
merge(typePolicies, autocompleteTypePolicies);
merge(typePolicies, buildingComponentTypePolicies);
merge(typePolicies, categoryTypePolicies);
merge(typePolicies, ebkphCategoryTypePolicies);
merge(typePolicies, materialsDepotTypePolicies);
merge(typePolicies, materialsDepotTimelineTypePolicies);
merge(typePolicies, projectTypePolicies);
merge(typePolicies, searchRequestTypePolicies);
merge(typePolicies, searchRequestInterestTypePolicies);
merge(typePolicies, storageLocationTypePolicies);
merge(typePolicies, taskTypePolicies);
merge(typePolicies, userTypePolicies);

const ignoreMeAuthenticationError = onError(({ response, operation }) => {
  if (response && operation.operationName === 'Me') {
    response.errors = undefined;
  }
});

const redirectForUnauthorizedActions = onError(({ response }) => {
  if (get(response, ['errors', '0', 'message']) === 'Unauthorized') {
    window.location.reload();
  }
});

export const ACCESS_TOKEN_KEY = 'access_token';

const headerLink = setContext(async (_, { headers }) => {
  try {
    const token =
      cookie.get(ACCESS_TOKEN_KEY) || localStorage.getItem(ACCESS_TOKEN_KEY);
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    // console.log(error);
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    headerLink,
    redirectForUnauthorizedActions,
    ignoreMeAuthenticationError,
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
