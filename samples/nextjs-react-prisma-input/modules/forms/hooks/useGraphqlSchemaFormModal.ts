import { OperationVariables } from '@apollo/client';
import { PrismaInputArgs } from '@panter/prisma-inputs';
import { useCallback, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useVisibilityReducer } from '../../ui/core/hooks/visiblityToggleReducer';
import { GraphqlSchemaFormModalProps } from '../types';

type UseGraphqlSchemaFormModalProps<
  QData extends FieldValues,
  QVariables extends OperationVariables,
  MData,
  MVariables extends {
    data?: any;
  },
  FModel extends FieldValues,
  SchemaInput extends PrismaInputArgs<MVariables>,
> = Omit<
  GraphqlSchemaFormModalProps<
    QData,
    QVariables,
    MData,
    MVariables,
    FModel,
    SchemaInput
  >,
  'queryVariables' | 'skipQuery'
>;

export function useGraphqlSchemaFormModal<
  QData extends FieldValues,
  QVariables extends OperationVariables,
  MData,
  MVariables extends OperationVariables,
  FModel extends FieldValues,
  SchemaInput extends PrismaInputArgs<MVariables>,
>(
  props: UseGraphqlSchemaFormModalProps<
    QData,
    QVariables,
    MData,
    MVariables,
    FModel,
    SchemaInput
  >,
): [
  (where?: QVariables, skipQuery?: boolean) => void,
  GraphqlSchemaFormModalProps<
    QData,
    QVariables,
    MData,
    MVariables,
    FModel,
    SchemaInput
  >,
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
      // schema: '' as any,
      onClose,
      isOpen,
      skipQuery,
      queryVariables,
    },
  ];
}
