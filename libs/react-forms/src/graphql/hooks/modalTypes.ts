import { OperationVariables } from '@apollo/client';
import { FieldValues } from 'react-hook-form';
import { FormMutationOptions, FormQueryOptions } from '../../hooks';

export type BaseGraphqlFormModalProps<
  QData,
  QVariables extends OperationVariables,
  MData,
  MVariables extends OperationVariables,
  FModel extends FieldValues,
> = {
  style?: React.CSSProperties;
  className?: string;
  readOnly?: boolean;
  formFooterProps?: any; // TODO cro allow to define footerprops so we can type it specifically for antd, mui ....
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
