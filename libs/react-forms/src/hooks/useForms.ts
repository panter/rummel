import {
  ApolloError,
  BaseMutationOptions,
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
  LazyQueryResultTuple,
  TypedDocumentNode,
  useMutation,
  useQuery,
} from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import {
  DefaultValues,
  FieldValues,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { notNil } from '../utils/arrays';

export type FormCloseReason = 'canceled' | 'saved';
// export type UseFormMutationReturn<T extends FieldValues> = UseFormReturn<T> & {
//   formItem: (name: Path<T>) => BaseFormInputNoFormItemProps<T>;
// };
export type UseFormMutationReturn<T extends FieldValues> = UseFormReturn<T>;

export type GenericQueryOptions<
  TData,
  TVariables extends OperationVariables = OperationVariables,
> = {
  loadingModelError?:
    | LazyQueryResultTuple<TData, TVariables>[1]['error']
    | Error;
  model?: LazyQueryResultTuple<TData, TVariables>[1]['data'];
  loadingModel: boolean;
};

export type GenericMutationOptions<
  FModel extends FieldValues = any,
  MData = any,
  MVariables extends OperationVariables = OperationVariables,
> = {
  form: UseFormMutationReturn<FModel>;
  callMutation: MutationTuple<MData, MVariables>[0];
  submit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  resetMutation: MutationTuple<MData, MVariables>[1]['reset'];
  error?: MutationTuple<MData, MVariables>[1]['error'];
  submitting: boolean;
  submitted: boolean;
  mutationResult?: MutationTuple<MData, MVariables>[1]['data'];
};

/**
 * Basic interface, with some basic state to allow
 * a modal / sidebar or panel to interact with it.
 *
 */
export type BaseFormOptions = {
  submitting: boolean;
  submitted: boolean;
  error?: Error | null;
  doClose: () => void;
  submit: (e?: React.BaseSyntheticEvent) => Promise<void>;
};

export type FormMutationOptions<
  FModel extends FieldValues = FieldValues,
  MData = any,
  MVariables extends OperationVariables = OperationVariables,
> = {
  modelToInput: (data: FModel) => MVariables | undefined;
} & BaseFormOptions &
  GenericMutationOptions<FModel, MData, MVariables>;

export type UseFormMutationProps<
  FModel extends FieldValues,
  MData,
  MVariables extends OperationVariables,
> = {
  resourceId?: string;
  modelToInput: (data: FModel) => MVariables | undefined;
  mutationDataToModel?: (data: MData) => FModel | undefined | null;
  onClose?: (reason: FormCloseReason, v?: MData | null) => void;
  mutation: TypedDocumentNode<MData, MVariables>;
  options?: MutationHookOptions<MData, MVariables>;
  defaultValues?: DefaultValues<FModel>;
  sendEmptyVariables?: boolean;
};

/**
 * By providing a mutation this hook will reset form and mutation when
 * closing the form.
 *
 * This hook also return the loading states of the mutation to allow
 * Drawer and Modals to act on it.
 *
 */
export function useFormMutation<
  FModel extends FieldValues = any,
  MData = any,
  MVariables extends OperationVariables = OperationVariables,
>({
  mutation,
  options,
  onClose,
  modelToInput,
  mutationDataToModel,
  defaultValues,
  sendEmptyVariables,
}: UseFormMutationProps<FModel, MData, MVariables>): FormMutationOptions<
  FModel,
  MData,
  MVariables
> {
  const onCompleted = useCallback(
    (data: MData, completedOptions: BaseMutationOptions | undefined) => {
      onClose?.('saved', data);
      options?.onCompleted?.(data, completedOptions);
    },
    [onClose, options?.onCompleted],
  );

  const form = useForm<FModel>({ defaultValues });

  const [callMutation, mutationOptions] = useMutation(mutation, {
    ...options,
    onCompleted(data, clientOptions) {
      const newData = mutationDataToModel?.(data);
      newData !== null && form.reset(newData);
      onCompleted(data, clientOptions);
    },
    // onCompleted,
  });

  const close = useCallback(
    (reason: FormCloseReason) => {
      onClose?.(reason);
      mutationOptions.reset();
      form.reset({} as any, {
        keepValues: false,
        keepDefaultValues: false,
        keepDirty: false,
        keepDirtyValues: false,
        keepErrors: false,
        keepIsValid: false,
        keepIsSubmitSuccessful: false,
        keepIsSubmitted: false,
        keepTouched: false,
        keepSubmitCount: false,
        keepIsValidating: false,
      });
    },
    [onClose, mutationOptions.reset],
  );
  const doClose = useCallback(
    () => close('canceled'),
    [onClose, mutationOptions.reset],
  );

  const submit = form.handleSubmit((formModel) => {
    const variables = modelToInput(formModel);
    if (variables || (!variables && sendEmptyVariables)) {
      callMutation({ variables });
    } else {
      close('saved');
    }
  });

  return {
    form,
    callMutation,
    doClose,
    submit,
    error: mutationOptions.error,
    resetMutation: mutationOptions.reset,
    submitting: mutationOptions.loading,
    submitted: mutationOptions.called,
    mutationResult: mutationOptions.data,
    modelToInput,
  };
}

export type UseFormQueryProps<
  QResult = any,
  QVariables extends OperationVariables = OperationVariables,
> = {
  onCompleted?: (data?: QResult) => void;
  query?: TypedDocumentNode<QResult, QVariables>;
  variables?: QVariables;
  skipQuery?: boolean;
  validateResult?: (data: QResult, v?: QVariables | null) => Error | undefined;
};

/**
 * "variables" should provide the query variables
 * "skipQuery" will make sure no call goes to the server and therefore the
 * "model" property in the return value will always be null.
 *
 */
export type FormQueryOptions<
  QData,
  QVariables extends OperationVariables = OperationVariables,
> = GenericQueryOptions<QData, QVariables> & {
  variables?: QVariables | null;
  skipQuery: boolean;
  reset: () => void;
};

/**
 * By providing a query (query return form model) this hook return
 * the loading states of the query to allow Drawer and Modals to act on it.
 *
 * "variables" should provide the query variables
 * "skipQuery" will make sure no call goes to the server and therefore the
 * "model" property in the return value will always be null.
 *
 */

export function useFormQuery<
  QData = any,
  QVariables extends OperationVariables = OperationVariables,
>({
  query: initialQuery,
  variables,
  skipQuery,
  validateResult,
  onCompleted,
}: UseFormQueryProps<QData, QVariables>): FormQueryOptions<QData, QVariables> {
  const [called, setCalled] = useState(false);
  // cache query so we stick with the first we got.
  // this is because we cannot call useQuery conditionally
  const [query] = useState<TypedDocumentNode<QData, QVariables> | undefined>(
    initialQuery,
  );
  // call onCompleted if no query is provided, this happens only once, as we cache the query
  useEffect(() => {
    if ((!query || skipQuery) && !called) {
      setCalled(true);
      onCompleted?.();
    }
  }, [query, skipQuery, called, onCompleted]);

  let model: QData | undefined = undefined;
  let loadingModel: boolean = false;
  let loadingModelError: ApolloError | undefined = undefined;

  if (query) {
    const queryResult = useQuery(query, {
      onCompleted: (data) => {
        setCalled(true);
        onCompleted?.(data);
      },
      variables,
      skip: skipQuery,
      fetchPolicy: 'network-only',
    });

    model = queryResult.data;
    loadingModel = queryResult.loading;
    loadingModelError = queryResult.error;
  }

  const [error, setError] = useState<Error>();
  useEffect(() => {
    if (notNil(model) && validateResult) {
      setError(validateResult(model, variables));
    } else {
      setError(undefined);
    }
  }, [model, validateResult, variables]);

  const reset = useCallback(() => {
    setError(undefined);
    setCalled(false);
  }, []);

  return {
    model,
    reset,
    loadingModel,
    loadingModelError: loadingModelError || error,
    variables,
    skipQuery: Boolean(skipQuery),
  };
}
