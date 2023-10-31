import {
  MutationHookOptions,
  MutationTuple,
  TypedDocumentNode,
  useMutation,
} from '@apollo/client';
import { useCallback } from 'react';

export type UseGenericMutationProps<TData, TVariables> = {
  mutation: TypedDocumentNode<TData, TVariables>;
  options?: MutationHookOptions<TData, TVariables>;
};

export type GenericMutation<TData, TVariables> = {
  saveRaw: MutationTuple<TData, TVariables>[0];
  save: (input: TVariables) => ReturnType<MutationTuple<TData, TVariables>[0]>;
  resetMutation: MutationTuple<TData, TVariables>[1]['reset'];
  error?: MutationTuple<TData, TVariables>[1]['error'];
  submitting: boolean;
  submitted: boolean;
  successfullySubmitted: boolean;
  result?: MutationTuple<TData, TVariables>[1]['data'];
};

export function useGenericMutation<TData, TVariables>({
  mutation,
  options,
}: UseGenericMutationProps<TData, TVariables>): GenericMutation<
  TData,
  TVariables
> {
  const [saveRaw, { error, loading, data, called, reset }] = useMutation<
    TData,
    TVariables
  >(mutation, options);

  const save = useCallback(
    (variables: TVariables) => saveRaw({ variables }),
    [saveRaw],
  );

  return {
    saveRaw,
    save,
    error,
    resetMutation: reset,
    submitting: loading,
    submitted: called,
    successfullySubmitted: Boolean(called && !loading && !error),
    result: data,
  };
}
