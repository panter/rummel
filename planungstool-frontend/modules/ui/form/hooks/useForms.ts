import {
  BaseMutationOptions,
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
  QueryTuple,
  TypedDocumentNode,
  useMutation,
  useQuery,
} from '@apollo/client';
import {
  InferPrismaModel,
  PrismaInputArgs,
  PrismaInputReferences,
  PrismaInputSchema,
  modelToInput,
} from '@panter/prisma-inputs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DefaultValues,
  FieldValues,
  Path,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { BaseFormInputNoFormItemProps } from '../../../forms/components/antd/input/FormInputController';
import { notNil } from '../../core/utils/arrays';

export type UseFormMutationReturn<T extends FieldValues> = UseFormReturn<T> & {
  formItem: (name: Path<T>) => BaseFormInputNoFormItemProps<T>;
};

export type GenericQueryOptions<
  TData,
  TVariables extends OperationVariables = OperationVariables,
> = {
  loadingModelError?: QueryTuple<TData, TVariables>[1]['error'] | Error;
  model?: QueryTuple<TData, TVariables>[1]['data'];
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
  onClose?: (v?: MData | null) => void;
  mutation: TypedDocumentNode<MData, MVariables>;
  options?: MutationHookOptions<MData, MVariables>;
  defaultValues?: DefaultValues<FModel>;
  sendEmptyVariables?: boolean;
  disableCloseOnEmptyVariables?: boolean;
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
  resourceId,
  mutation,
  options,
  onClose,
  modelToInput,
  mutationDataToModel,
  defaultValues,
  sendEmptyVariables,
  disableCloseOnEmptyVariables,
}: UseFormMutationProps<FModel, MData, MVariables>): FormMutationOptions<
  FModel,
  MData,
  MVariables
> {
  const onCompleted = useCallback(
    (data: MData, completedOptions: BaseMutationOptions | undefined) => {
      onClose?.(data);
      options?.onCompleted?.(data, completedOptions);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onClose, options?.onCompleted],
  );

  const formReturn = useForm<FModel>(defaultValues);

  const formItem = useCallback(
    (
      name: Path<FModel>,
    ): BaseFormInputNoFormItemProps<FModel, Path<FModel>> => ({
      resourceId,
      control: formReturn.control,
    }),
    [resourceId, formReturn.control],
  );

  const form: UseFormMutationReturn<FModel> = useMemo(
    () => ({ ...formReturn, formItem }),
    [formReturn, formItem],
  );
  const [callMutation, mutationOptions] = useMutation(mutation, {
    ...options,
    onCompleted(data, clientOptions) {
      const newData = mutationDataToModel?.(data);
      newData !== null && form.reset(newData);
      onCompleted(data, clientOptions);
    },
    // onCompleted,
  });

  const doClose = useCallback(() => {
    onClose?.();
    mutationOptions.reset();
    // form.reset({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, mutationOptions.reset]);

  const submit = form.handleSubmit((formModel) => {
    const variables = modelToInput(formModel);
    if (variables || (!variables && sendEmptyVariables)) {
      callMutation({ variables });
    }
    if (
      !Object.keys(variables || {}).length &&
      !sendEmptyVariables &&
      !disableCloseOnEmptyVariables
    ) {
      doClose();
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
  onCompleted?: (data: QResult) => void;
  query: TypedDocumentNode<QResult, QVariables>;
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
 * By providing a query to get the model the form should edit this hook return
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
  query,
  variables,
  skipQuery,
  validateResult,
  onCompleted,
}: UseFormQueryProps<QData, QVariables>): FormQueryOptions<QData, QVariables> {
  const {
    data: model,
    loading: loadingModel,
    error: loadingModelError,
  } = useQuery(query, {
    onCompleted,
    variables,
    skip: skipQuery,
    fetchPolicy: 'network-only',
  });
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
