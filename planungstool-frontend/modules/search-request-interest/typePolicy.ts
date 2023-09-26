import { StrictTypedTypePolicies } from '../../@generated/type-policies';

export const searchRequestInterestTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      searchRequestInterest: {
        read(_, { args, toReference }) {
          return toReference({
            __typename: 'SearchRequestInterest',
            id: args?.id,
          });
        },
      },
    },
  },
};
