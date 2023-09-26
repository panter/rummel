import { graphql } from '../../../@generated';
import { useQuery } from '@apollo/client';

export const MaterialsDepotReferenceQuery = graphql(/* GraphQL */ `
  query MaterialsDepotReference($materialsDepotId: String!) {
    materialsDepot(where: { id: $materialsDepotId }) {
      id
      shortName
    }
  }
`);

export const useMaterialsDepotReference = (materialsDepotId?: string) => {
  const { data, loading, error } = useQuery(MaterialsDepotReferenceQuery, {
    variables: {
      materialsDepotId: materialsDepotId as string,
    },
    skip: !materialsDepotId,
    fetchPolicy: 'cache-and-network',
  });

  return {
    materialsDepotRef: data?.materialsDepot,
    loading,
    error,
  };
};
