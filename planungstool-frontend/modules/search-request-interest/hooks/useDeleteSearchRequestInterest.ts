import { useMutation } from '@apollo/client';
import { DeleteOneSearchRequestInterestMutation as mutation } from '../resource';
import {
  DeleteOneSearchRequestInterestMutation,
  DeleteOneSearchRequestInterestMutationVariables,
} from '../../../@generated/graphql';

export const useDeleteSearchRequestInterest = () => {
  const [deleteSearchRequestInterest, options] = useMutation<
    DeleteOneSearchRequestInterestMutation,
    DeleteOneSearchRequestInterestMutationVariables
  >(mutation);

  return [
    (where: DeleteOneSearchRequestInterestMutationVariables['where']) =>
      deleteSearchRequestInterest({ variables: { where } }),
    options,
  ] as const;
};
