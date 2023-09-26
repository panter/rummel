import {
  ApolloCache,
  ApolloError,
  FetchResult,
  TypedDocumentNode,
  useMutation,
} from '@apollo/client';
import { useCallback } from 'react';

export type OtpFlowPhase = 'trigger' | 'finish' | 'finished';

type UseOtpFlowReturn<P extends OtpFlowPhase = OtpFlowPhase> = {
  triggerOtpLogin: (triggerId: string) => void;
  finishOtpLogin: (triggerId: string, otp: string) => void;
  phase: P;
  error: ApolloError | undefined;
  loading: boolean;
};

export const useOtpLoginFlow = <
  TResult,
  TVariables,
  FResult,
  FVariables,
>(props: {
  triggerMutation: TypedDocumentNode<TResult, TVariables>;
  finishMutation: TypedDocumentNode<FResult, FVariables>;
  triggerVariables: (triggerId: string) => TVariables;
  finishVariables: (triggerId: string, otp: string) => FVariables;
  onFinish: (
    client: ApolloCache<unknown>,
    result?: Omit<FetchResult<FResult>, 'context'>,
  ) => void;
  onTriggerError: (error: ApolloError) => void;
  onFinishError: (error: ApolloError) => void;
}): UseOtpFlowReturn => {
  const { triggerVariables, finishVariables } = props;

  const [
    triggerOtpLoginRaw,
    { error: triggerError, loading: triggerLoading, called: triggerCalled },
  ] = useMutation(props.triggerMutation, {
    onError: (a) => props?.onTriggerError(a),
  });

  const [
    finishOtpLoginRaw,
    { error: finishError, loading: finishLoading, called: finishCalled },
  ] = useMutation(props.finishMutation, {
    onError: (a) => props?.onFinishError(a),
    update: props?.onFinish,
  });

  const phase: OtpFlowPhase =
    !triggerCalled || triggerError || triggerLoading
      ? 'trigger'
      : !finishCalled || finishError || finishLoading
      ? 'finish'
      : 'finished';

  const triggerOtpLogin = useCallback(
    (triggerId: string) => {
      if (phase === 'trigger') {
        triggerOtpLoginRaw({
          variables: triggerVariables(triggerId.trim()),
        });
      }
    },
    [triggerOtpLoginRaw, triggerVariables, phase],
  );

  const finishOtpLogin = useCallback(
    (triggerId: string, otp: string) => {
      if (phase === 'finish') {
        finishOtpLoginRaw({
          variables: finishVariables(triggerId.trim(), otp.trim()),
        });
      }
    },
    [finishOtpLoginRaw, finishVariables, phase],
  );

  return {
    triggerOtpLogin,
    finishOtpLogin,
    phase,
    error: triggerError || finishError,
    loading: triggerLoading || finishLoading,
  };
};
