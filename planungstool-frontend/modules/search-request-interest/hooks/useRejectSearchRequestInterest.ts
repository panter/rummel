import { useMutation } from '@apollo/client';
import { RejectOneSearchRequestInterestMutation as mutation } from '../resource';
import {
  RejectOneSearchRequestInterestMutation,
  RejectOneSearchRequestInterestMutationVariables,
} from '../../../@generated/graphql';

export const useRejectSearchRequestInterest = () => {
  const [reject, options] = useMutation<
    RejectOneSearchRequestInterestMutation,
    RejectOneSearchRequestInterestMutationVariables
  >(mutation);

  return [
    (input: RejectOneSearchRequestInterestMutationVariables['input']) =>
      reject({ variables: { input } }),
    options,
  ] as const;
};
