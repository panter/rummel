import { OperationVariables } from '@apollo/client';
import { PrismaInputArgs } from '@panter/prisma-inputs';
import { useCallback, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { BaseGraphqlFormModalProps } from './modalTypes';
import { PrismaFormProps } from '../../hooks';

export type PrismaFormModalProps<
  QData extends FieldValues,
  QVariables extends OperationVariables,
  MData,
  MVariables extends OperationVariables,
  FModel extends FieldValues,
  SchemaInput extends PrismaInputArgs<MVariables>,
  SchemaModel,
> = BaseGraphqlFormModalProps<QData, QVariables, MData, MVariables, FModel> &
  PrismaFormProps<
    QData,
    QVariables,
    MData,
    MVariables,
    FModel,
    SchemaInput,
    SchemaModel
  >;

type UsePrismaFormModalProps<
  QData extends FieldValues,
  QVariables extends OperationVariables,
  MData,
  MVariables extends {
    data?: any;
  },
  FModel extends FieldValues,
  SchemaInput extends PrismaInputArgs<MVariables>,
  SchemaModel,
> = Omit<
  PrismaFormModalProps<
    QData,
    QVariables,
    MData,
    MVariables,
    FModel,
    SchemaInput,
    SchemaModel
  >,
  'queryVariables' | 'skipQuery'
>;

export function usePrismaFormModal<
  QData extends FieldValues,
  QVariables extends OperationVariables,
  MData,
  MVariables extends OperationVariables,
  FModel extends FieldValues,
  SchemaInput extends PrismaInputArgs<MVariables>,
  SchemaModel,
>(
  props: UsePrismaFormModalProps<
    QData,
    QVariables,
    MData,
    MVariables,
    FModel,
    SchemaInput,
    SchemaModel
  >,
): [
  (where?: QVariables, skipQuery?: boolean) => void,
  PrismaFormModalProps<
    QData,
    QVariables,
    MData,
    MVariables,
    FModel,
    SchemaInput,
    SchemaModel
  >,
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
    props.onClose?.('canceled');
    setIsOpen(false);
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
