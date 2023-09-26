import { ApolloError, OperationVariables } from '@apollo/client';
import { ArgsProps } from 'antd/lib/notification/interface';
import { ReactNode, use, useState } from 'react';

import { GenericMutation, UseGenericMutationProps } from './useGenericMutation';
import { processCompleted, processError } from './useMutationWithConfirm';
import { FieldValues } from 'react-hook-form';
import {
  FormMutationOptions,
  UseFormMutationProps,
  useFormMutation,
} from '../../ui/form/hooks/useForms';
import { useVisibilityReducer } from '../../ui/core/hooks/visiblityToggleReducer';

export interface MutationWithFormDialogProps<
  FModel extends FieldValues = FieldValues,
  TData extends FieldValues = FieldValues,
  TVariables extends OperationVariables = OperationVariables,
  InitialValue = any,
> {
  onSubmit: (c: FModel) => void;
  mutation: FormMutationOptions<FModel, TData, TVariables>;
  title: ReactNode;
  submitLabel: string;
  visible?: boolean;
  initialValue?: InitialValue;
}

type UseMutationWithFormDialogMessagesProps = {
  title?: string;
  content?: ReactNode;
  icon?: ReactNode;
  submitLabel: string;
};

type UseMutationWithFormDialog<
  FModel extends FieldValues,
  TData,
  TVariables extends OperationVariables,
  InitialValue,
> = UseFormMutationProps<FModel, TData, TVariables> &
  UseMutationWithFormDialogMessagesProps & {
    toVariables: (data: FModel, initialValues: InitialValue) => TVariables;
    defaultSuccessMessage?: ReactNode;
    defaultUnsuccessMessage?: ReactNode;
    // getMutationState?: (
    //   m: GenericMutation<TData, TVariables>,
    // ) => 'error' | 'success' | undefined;
    onSuccess?: (d: TData, v?: TVariables) => Partial<ArgsProps>;
    onError?: (error: ApolloError | Error, v?: FModel) => Partial<ArgsProps>;
  };

export function useMutationWithFormDialog<
  FModel extends FieldValues = any,
  MData extends FieldValues = any,
  MVariables extends OperationVariables = OperationVariables,
  InitialValue = any,
>({
  title,
  icon,
  toVariables,
  submitLabel,
  defaultSuccessMessage,
  defaultUnsuccessMessage,
  onSuccess,
  onError,
  modelToInput,
  ...genericMutationProps
}: UseMutationWithFormDialog<FModel, MData, MVariables, InitialValue>): [
  (v: InitialValue) => void,
  MutationWithFormDialogProps<FModel, MData, MVariables, InitialValue>,
] {
  const { state: visible, show, hide } = useVisibilityReducer();
  const [initialValue, setVariables] = useState<InitialValue | undefined>();
  const mutation = useFormMutation({
    modelToInput: modelToInput,
    mutation: genericMutationProps.mutation,
    options: {
      ...genericMutationProps.options,
      onCompleted: (data, clientOptions) => {
        processCompleted({
          data,
          defaultSuccessMessage,
          onSuccess,
          variables: clientOptions?.variables as any,
        });
        genericMutationProps.options?.onCompleted?.(data);
        mutation.resetMutation();
      },
      onError: (error, clientOptions) => {
        processError({
          error,
          defaultUnsuccessMessage,
          onError,
          variables: clientOptions?.variables as any,
        });
        genericMutationProps.options?.onError?.(error);
        mutation.resetMutation();
      },
    },
    onClose: hide,
  });

  const open = (v: InitialValue | undefined) => {
    setVariables(v);
    show();
  };

  // if visible we know we have set variables even if they are undefinded
  const hasVariables = (
    visible?: boolean,
    variables?: InitialValue | undefined,
  ): variables is InitialValue => Boolean(visible);

  // try to make sure the variables for the mutation are there if needed
  const onSubmit = (model: FModel) =>
    hasVariables(visible, initialValue)
      ? mutation.callMutation(toVariables(model, initialValue))
      : console.error('Unable to submit if not visible');

  return [
    open,
    {
      onSubmit,
      visible,
      mutation,
      submitLabel,
      title,
      initialValue,
    },
  ];
}
