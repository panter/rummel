import { StrictTypedTypePolicies } from '../../@generated/type-policies';

export const materialsDepotTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      materialsDepot: {
        read(_, { args, toReference }) {
          return toReference({
            __typename: 'MaterialsDepot',
            id: args?.id,
          });
        },
      },
    },
  },
};
