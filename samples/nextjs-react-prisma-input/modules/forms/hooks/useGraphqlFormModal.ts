import { OperationVariables } from '@apollo/client';
import { useCallback, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useVisibilityReducer } from '../../ui/core/hooks/visiblityToggleReducer';
import { GraphqlFormModalProps } from '../types';

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
  const { state: isOpen, show: doOpen, hide: doClose } = useVisibilityReducer();
  const [queryVariables, setQueryVariables] = useState<QVariables>();
  const [skipQuery, setSkipQuery] = useState<boolean>(true);

  const openForm = useCallback((where?: QVariables, skipQuery?: boolean) => {
    setQueryVariables(where);
    setSkipQuery(skipQuery || false);
    doOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = useCallback(() => {
    setQueryVariables(undefined);
    setSkipQuery(true);
    props.onClose?.();
    doClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
