import { StrictTypedTypePolicies } from '../../@generated/type-policies';

export const taskTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      task: {
        read(_, { args, toReference }) {
          return toReference({
            __typename: 'Task',
            id: args?.id,
          });
        },
      },
    },
  },
};
