import { StrictTypedTypePolicies } from '../../@generated/type-policies';

/**
 * Autocomplete FindOne query type policy, used to resolve the query to a reference.
 *
 */
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
