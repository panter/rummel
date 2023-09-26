import { StrictTypedTypePolicies } from '../../@generated/type-policies';

export const materialsDepotTimelineTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      materialsDepotTimeline: {
        read(_, { args, toReference }) {
          return toReference({
            __typename: 'MaterialsDepotTimeline',
            id: args?.id,
          });
        },
      },
    },
  },
};
