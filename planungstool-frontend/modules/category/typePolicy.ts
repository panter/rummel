import { StrictTypedTypePolicies } from '../../@generated/type-policies';

export const categoryTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      category: {
        read(_, { args, toReference }) {
          return toReference({
            __typename: 'Category',
            id: args?.id,
          });
        },
      },
    },
  },
};
