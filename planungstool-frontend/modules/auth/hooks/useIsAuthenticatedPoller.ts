import { graphql } from '../../../@generated';
import { useQuery } from '@apollo/client';

export const ME_QUERY_NAME = 'Me';

export const IsAuthenticatedQueryPoller = graphql(/* GraphQL */ `
  query Me {
    me {
      id
    }
  }
`);

export const useIsAuthenticatedPoller = () => {
  const { loading, data } = useQuery(IsAuthenticatedQueryPoller, {
    fetchPolicy: 'network-only',
    pollInterval: 1000 * 60 * 1, // 1 minute
  });

  return {
    isAuthenticated: Boolean(data?.me?.id),
    loading,
  };
};
