import { graphql } from '../../../@generated';
import { useQuery } from '@apollo/client';

export const StorageLocationReferenceQuery = graphql(/* GraphQL */ `
  query StorageLocationReference($storageLocationId: String!) {
    storageLocation(where: { id: $storageLocationId }) {
      id
      name
    }
  }
`);

export const useStorageLocationReference = (storageLocationId?: string) => {
  const { data, loading, error } = useQuery(StorageLocationReferenceQuery, {
    variables: {
      storageLocationId: storageLocationId as string,
    },
    skip: !storageLocationId,
    fetchPolicy: 'cache-and-network',
  });

  return {
    storageLocationRef: data?.storageLocation,
    loading,
    error,
  };
};
