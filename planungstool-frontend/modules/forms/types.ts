import { OperationVariables } from '@apollo/client';
import {
  BaseFormOptions,
  FormMutationOptions,
  FormQueryOptions,
} from '../ui/form/hooks/useForms';
import { FormFooterProps } from './components/antd/FormFooter';
import { FieldValues } from 'react-hook-form';
import { PrismaInputArgs } from '@panter/prisma-inputs';
import { GraphqlFormProps } from '../ui/form/hooks/useGraphqlForms';
import { PrismaFormProps } from '../ui/form/hooks/usePrismaForms';

export type FormModalQueryProps<
  QData,
  QVariables extends OperationVariables = OperationVariables,
> = {
  style?: {};
  className?: string;
  readOnly?: boolean;
  schemaForm: BaseFormOptions;
  queryInfo?: FormQueryOptions<QData, QVariables>;
  formFooterProps?: Omit<FormFooterProps, 'onClose'>;
  renderForm?: (props: {
    schemaForm: BaseFormOptions;
    readOnly?: boolean;
    queryInfo?: FormQueryOptions<QData, QVariables>;
  }) => React.ReactNode;
};

export type BaseGraphqlFormModalProps<
  QData,
  QVariables extends OperationVariables,
  MData,
  MVariables extends OperationVariables,
  FModel extends FieldValues,
> = Omit<
  FormModalQueryProps<QData, QVariables>,
  'queryInfo' | 'schemaForm' | 'renderForm'
> & {
  isOpen?: boolean;
  title?: React.ReactNode;
  editTitlei18nKey?: string;
  createTitlei18nKey?: string;
  children?: React.ReactNode;
  // TODO cro allow to define modalprops so we can type it specifically for antd, mui ....
  modalProps?: any;
  renderForm?: (props: {
    schemaForm: FormMutationOptions<FModel, MData, MVariables>;
    readOnly?: boolean;
    queryInfo?: FormQueryOptions<QData, QVariables>;
  }) => React.ReactNode;
};

export type GraphqlFormModalProps<
  QData,
  QVariables extends OperationVariables,
  MData,
  MVariables extends OperationVariables,
  FModel extends FieldValues,
> = BaseGraphqlFormModalProps<QData, QVariables, MData, MVariables, FModel> &
  GraphqlFormProps<QData, QVariables, MData, MVariables, FModel>;

export type GraphqlSchemaFormModalProps<
  QData extends FieldValues,
  QVariables extends OperationVariables,
  MData,
  MVariables extends OperationVariables,
  FModel extends FieldValues,
  SchemaInput extends PrismaInputArgs<MVariables>,
> = BaseGraphqlFormModalProps<QData, QVariables, MData, MVariables, FModel> &
  PrismaFormProps<QData, QVariables, MData, MVariables, FModel, SchemaInput>;
