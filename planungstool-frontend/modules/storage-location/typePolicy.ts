import { StrictTypedTypePolicies } from '../../@generated/type-policies';

export const storageLocationTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      storageLocation: {
        read(_, { args, toReference }) {
          return toReference({
            __typename: 'StorageLocation',
            id: args?.id,
          });
        },
      },
    },
  },
};
