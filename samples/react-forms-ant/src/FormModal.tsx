import { OperationVariables } from '@apollo/client';
import { BaseFormOptions, FormQueryOptions } from '@panter/react-forms';
import { Modal, ModalProps } from 'antd';
import React from 'react';
import { FormWithBottom } from './FormComponents';
import { FormFooter, FormFooterProps } from './FormFooter';
import { GenericGraphQLErrorAlert } from './GenericErrorAlert';
import { WaitForFormQuery } from './WaitForQuery';

export type FormModalQueryProps<
  QData,
  QVariables extends OperationVariables = OperationVariables,
> = {
  style?: React.CSSProperties;
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
export type FormModalProps<
  QData,
  QVariables extends OperationVariables = OperationVariables,
> = ModalProps & FormModalQueryProps<QData, QVariables>;

export const FormModal = <
  QData,
  QVariables extends OperationVariables = OperationVariables,
>({
  readOnly,
  schemaForm,
  queryInfo,
  formFooterProps,
  open,
  renderForm,
  children,
  ...drawerProps
}: FormModalProps<QData, QVariables>) => {
  return (
    <Modal
      onCancel={schemaForm.doClose}
      destroyOnClose
      keyboard
      closable={readOnly || !schemaForm.submitting}
      maskClosable={Boolean(readOnly)}
      open={open}
      footer={
        <FormFooter
          schemaForm={schemaForm}
          submitHidden={readOnly}
          {...formFooterProps}
        />
      }
      {...drawerProps}
    >
      <FormWithBottom>
        <div>
          <WaitForFormQuery queryInfo={queryInfo}>
            {children
              ? children
              : renderForm?.({ schemaForm, readOnly, queryInfo }) || null}
          </WaitForFormQuery>
        </div>
        <GenericGraphQLErrorAlert error={schemaForm.error} />
      </FormWithBottom>
    </Modal>
  );
};
