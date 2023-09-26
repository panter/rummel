import { useMutation } from '@apollo/client';
import { AcceptOneSearchRequestInterestMutation as mutation } from '../resource';
import {
  AcceptOneSearchRequestInterestMutation,
  AcceptOneSearchRequestInterestMutationVariables,
} from '../../../@generated/graphql';

export const useAcceptSearchRequestInterest = () => {
  const [Accept, options] = useMutation<
    AcceptOneSearchRequestInterestMutation,
    AcceptOneSearchRequestInterestMutationVariables
  >(mutation);

  return [
    (input: AcceptOneSearchRequestInterestMutationVariables['input']) =>
      Accept({ variables: { input } }),
    options,
  ] as const;
};
