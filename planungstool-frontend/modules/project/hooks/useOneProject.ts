import { useQuery } from '@apollo/client';
import { OneProjectQuery } from '../resource';
import {
  OneProjectQuery as OneProjectQueryType,
  OneProjectQueryVariables,
} from '../../../@generated/graphql';

export const useOneProject = (id?: string) => {
  const { data, loading, error } = useQuery<
    OneProjectQueryType,
    OneProjectQueryVariables
  >(OneProjectQuery, { variables: { where: { id: id as string } }, skip: !id });

  return {
    project: data?.project,
    error,
    loading,
  };
};
