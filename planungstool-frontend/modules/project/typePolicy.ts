import { StrictTypedTypePolicies } from '../../@generated/type-policies';

export const projectTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      project: {
        read(_, { args, toReference }) {
          return toReference({
            __typename: 'Project',
            id: args?.id,
          });
        },
      },
    },
  },
};
