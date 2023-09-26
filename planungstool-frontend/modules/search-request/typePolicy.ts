import { StrictTypedTypePolicies } from '../../@generated/type-policies';

export const searchRequestTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      searchRequest: {
        read(_, { args, toReference }) {
          return toReference({
            __typename: 'SearchRequest',
            id: args?.id,
          });
        },
      },
    },
  },
};
