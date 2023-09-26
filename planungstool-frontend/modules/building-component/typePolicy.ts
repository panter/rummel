import { StrictTypedTypePolicies } from '../../@generated/type-policies';

export const buildingComponentTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      buildingComponent: {
        read(_, { args, toReference }) {
          return toReference({
            __typename: 'BuildingComponent',
            id: args?.id,
          });
        },
      },
    },
  },
};
