import { ApolloError } from '@apollo/client';
import { notification, Modal } from 'antd';
import { ReactNode, useMemo, useRef } from 'react';
import { ArgsProps } from 'antd/lib/notification/interface';
import {
  GenericMutation,
  UseGenericMutationProps,
  useGenericMutation,
} from '@panter/react-forms';
export const getDefaultMutationState = (m: GenericMutation<any, any>) => {
  if (m.successfullySubmitted) {
    return 'success';
  } else if (m.error) {
    return 'error';
  }
};
type UseMutationWithConfirmMessagesProps = {
  title?: string;
  content?: ReactNode;
  icon?: ReactNode;
};

export const processCompleted = <TData, TVariables>({
  data,
  defaultSuccessMessage,
  onSuccess,
  variables,
}: {
  data: TData;
  defaultSuccessMessage?: ReactNode;
  onSuccess?: (
    d: TData,
    v?: TVariables,
  ) => Partial<ArgsProps & { notificationType: 'success' | 'error' }>;
  variables?: TVariables;
}) => {
  const { notificationType = 'success', ...props } = {
    ...(onSuccess ? onSuccess(data, variables) : {}),
  };
  if (onSuccess || defaultSuccessMessage) {
    const options: ArgsProps = {
      placement: 'bottomRight',
      message: defaultSuccessMessage,
      ...props,
    };

    if (notificationType === 'success') {
      notification.success(options);
    } else {
      notification.error(options);
    }
  }
};

export const processError = <TVariables,>({
  error,
  defaultUnsuccessMessage,
  onError,
  variables,
}: {
  error: ApolloError | Error;
  defaultUnsuccessMessage?: ReactNode;
  onError?: (
    error: ApolloError | Error,
    variables?: TVariables,
  ) => Partial<ArgsProps & { notificationType: 'success' | 'error' }>;
  variables?: TVariables;
}) => {
  if (onError || defaultUnsuccessMessage) {
    const { notificationType = 'error', ...props } = {
      ...(onError ? onError(error, variables) : {}),
    };

    const options: ArgsProps = {
      placement: 'bottomRight',
      message: defaultUnsuccessMessage,
      ...props,
    };

    if (notificationType === 'success') {
      notification.success(options);
    } else {
      notification.error(options);
    }
  }
};

type UseMutationWithConfirmProps<TData, TVariables> = UseGenericMutationProps<
  TData,
  TVariables
> &
  UseMutationWithConfirmMessagesProps & {
    defaultSuccessMessage?: ReactNode;
    defaultUnsuccessMessage?: ReactNode;
    getMutationState?: (
      m: GenericMutation<TData, TVariables>,
    ) => 'error' | 'success' | undefined;
    onSuccess?: (
      data: TData,
      v?: TVariables,
    ) => Partial<ArgsProps & { notificationType: 'success' | 'error' }>;
    onError?: (
      error: ApolloError | Error,
      v?: TVariables,
    ) => Partial<ArgsProps>;
  };

export function useMutationWithConfirm<TData, TVariables>({
  title,
  content,
  icon,
  defaultSuccessMessage,
  defaultUnsuccessMessage,
  onSuccess,
  onError,
  ...genericMutationProps
}: UseMutationWithConfirmProps<TData, TVariables>) {
  const variables = useRef<TVariables>();
  const genericMutation = useGenericMutation<TData, TVariables>({
    mutation: genericMutationProps.mutation,
    options: {
      ...genericMutationProps.options,
      onCompleted: (data) => {
        processCompleted({
          data,
          defaultSuccessMessage,
          onSuccess,
          variables: variables.current,
        });
        genericMutationProps.options?.onCompleted?.(data);
        genericMutation.resetMutation();
      },
      onError: (error) => {
        processError({
          error,
          defaultUnsuccessMessage,
          onError,
          variables: variables.current,
        });
        genericMutationProps.options?.onError?.(error);
        genericMutation.resetMutation();
      },
    },
  });

  const genericMutationWithConfirm = useMemo(
    () => ({
      ...genericMutation,
      save: (
        v: TVariables,
        confirmProps?: Partial<UseMutationWithConfirmMessagesProps>,
      ) => {
        variables.current = v;

        Modal.confirm({
          title: confirmProps?.title || title,
          content: confirmProps?.content || content,
          icon: confirmProps?.icon || icon,
          onOk: () => {
            // mutation return a promise, if we return the promise the confirm
            // will wait to close until the promise is consumed
            genericMutation.save(v);
          },
        });
      },
    }),
    [genericMutation, title, content, icon],
  );

  return genericMutationWithConfirm;
}
