import { StrictTypedTypePolicies } from '../../@generated/type-policies';

export const ebkphCategoryTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      ebkphCategory: {
        read(_, { args, toReference }) {
          return toReference({
            __typename: 'EbkphCategory',
            id: args?.id,
          });
        },
      },
    },
  },
};
