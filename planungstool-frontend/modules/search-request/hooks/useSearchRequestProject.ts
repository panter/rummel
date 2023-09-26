import { useQuery } from '@apollo/client';
import {
  SearchRequestProjectQuery as SearchRequestProjectQueryType,
  SearchRequestProjectQueryVariables,
} from '../../../@generated/graphql';
import { graphql } from '../../../@generated';

export const SearchRequestProjectQuery = graphql(/* GraphQL */ `
  query searchRequestProject($where: EntityIdInput!) {
    searchRequest(where: $where) {
      id
      project {
        id
        shortName
      }
    }
  }
`);

export const useSearchRequestProject = (searchRequestId?: string) => {
  const { data, loading, error } = useQuery<
    SearchRequestProjectQueryType,
    SearchRequestProjectQueryVariables
  >(SearchRequestProjectQuery, {
    variables: { where: { id: searchRequestId as string } },
    skip: !searchRequestId,
  });

  return {
    searchRequest: data?.searchRequest,
    error,
    loading,
  };
};
