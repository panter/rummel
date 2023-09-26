import { StrictTypedTypePolicies } from '../../@generated/type-policies';

export const autocompleteTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      autocomplete: {
        read(_, { args, toReference }) {
          return toReference({
            __typename: 'Autocomplete',
            id: args?.id,
          });
        },
      },
    },
  },
};
