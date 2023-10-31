import { OperationVariables } from '@apollo/client';
import { useCallback, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { GraphqlFormProps } from '../../hooks';
import { BaseGraphqlFormModalProps } from './modalTypes';

export type GraphqlFormModalProps<
  QData,
  QVariables extends OperationVariables,
  MData,
  MVariables extends OperationVariables,
  FModel extends FieldValues,
> = BaseGraphqlFormModalProps<QData, QVariables, MData, MVariables, FModel> &
  GraphqlFormProps<QData, QVariables, MData, MVariables, FModel>;

type UseGraphqlFormModalProps<
  QData = any,
  QVariables extends OperationVariables = OperationVariables,
  MData = any,
  MVariables extends OperationVariables = OperationVariables,
  FModel extends FieldValues = MVariables,
> = Omit<
  GraphqlFormModalProps<QData, QVariables, MData, MVariables, FModel>,
  'queryVariables' | 'skipQuery'
>;

export function useGraphqlFormModal<
  QData = any,
  QVariables extends OperationVariables = OperationVariables,
  MData = any,
  MVariables extends OperationVariables = OperationVariables,
  FModel extends FieldValues = MVariables,
>(
  props: UseGraphqlFormModalProps<QData, QVariables, MData, MVariables, FModel>,
): [
  (where?: QVariables, skipQuery?: boolean) => void,
  GraphqlFormModalProps<QData, QVariables, MData, MVariables, FModel>,
] {
  const [isOpen, setIsOpen] = useState(false);
  const [queryVariables, setQueryVariables] = useState<QVariables>();
  const [skipQuery, setSkipQuery] = useState<boolean>(true);

  const openForm = useCallback((where?: QVariables, skipQuery?: boolean) => {
    setQueryVariables(where);
    setSkipQuery(skipQuery || false);
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setQueryVariables(undefined);
    setSkipQuery(true);
    props.onClose?.();
    setIsOpen(false);
  }, [props.onClose]);

  return [
    openForm,
    {
      ...props,
      onClose,
      isOpen,
      skipQuery,
      queryVariables,
    },
  ];
}
