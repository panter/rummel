import { BaseFormOptions } from '@panter/react-forms';
import { Button, Row, Space } from 'antd';
import React, { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

const Base = styled.div``;

export type FormFooterProps = {
  schemaForm: BaseFormOptions;
  submitDisabled?: boolean;
  closeDisabled?: boolean;
  submitHidden?: boolean;
  closeHidden?: boolean;
  submitLabel?: ReactNode;
  closeLabel?: ReactNode;
  submiti18nKey?: string;
  closei18nKey?: string;
  enableCloseWhileSubmiting?: boolean;
  justifyRow?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  children?: ReactNode;
  beforeAction?: ReactNode;
  afterAction?: ReactNode;
};

export const FormFooter: React.FC<FormFooterProps> = ({
  schemaForm,
  submitDisabled,
  closeDisabled,
  submitHidden,
  closeHidden,
  submitLabel,
  closeLabel,
  justifyRow,
  submiti18nKey = 'common.saveAction',
  closei18nKey = 'common.closeAction',
  enableCloseWhileSubmiting,
  children,
  beforeAction,
  afterAction,
}) => {
  const { t } = useTranslation();
  return (
    <Base>
      <Row
        justify={justifyRow ? justifyRow : children ? 'space-between' : 'end'}
        align="middle"
      >
        {children}
        <Space align="end" wrap>
          {beforeAction}
          {!closeHidden ? (
            <Button
              onClick={schemaForm.doClose}
              disabled={
                closeDisabled ||
                (schemaForm.submitting && !enableCloseWhileSubmiting)
              }
              tabIndex={-1}
            >
              {closeLabel || t(closei18nKey as any)}
            </Button>
          ) : null}
          {!submitHidden ? (
            <Button
              onClick={schemaForm.submit}
              type="primary"
              loading={schemaForm.submitting}
              disabled={submitDisabled}
            >
              {submitLabel || t(submiti18nKey as any)}
            </Button>
          ) : null}
          {afterAction}
        </Space>
      </Row>
    </Base>
  );
};
