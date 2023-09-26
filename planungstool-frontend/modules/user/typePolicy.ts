import { StrictTypedTypePolicies } from '../../@generated/type-policies';

export const userTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      user: {
        read(_, { args, toReference }) {
          return toReference({
            __typename: 'User',
            id: args?.id,
          });
        },
      },
    },
  },
};
