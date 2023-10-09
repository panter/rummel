import { Button, Row, Space } from 'antd';
import React, { ReactNode, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import type { ResourcesWithNamespace } from '../../../../@generated/resources';
import { BaseFormOptions } from '../../../ui/form/hooks/useForms';
import { StickyFooter } from '../StickyFooter';

const Base = styled.div``;

export type FormFooterProps = {
  schemaForm: BaseFormOptions;
  submitDisabled?: boolean;
  closeDisabled?: boolean;
  submitHidden?: boolean;
  closeHidden?: boolean;
  submitLabel?: ReactNode;
  closeLabel?: ReactNode;
  submiti18nKey?: ResourcesWithNamespace;
  closei18nKey?: ResourcesWithNamespace;
  enableCloseWhileSubmiting?: boolean;
  justifyRow?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  children?: ReactNode;
  beforeAction?: ReactNode;
  afterAction?: ReactNode;
  stick?: boolean;
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
  stick,
}) => {
  const { t } = useTranslation();

  const ref = useRef<any>(null);
  return (
    <Base ref={ref}>
      <StickyFooter stickRef={ref} stick={stick}>
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
                {closeLabel || t(closei18nKey as ResourcesWithNamespace)}
              </Button>
            ) : null}
            {!submitHidden ? (
              <Button
                onClick={schemaForm.submit}
                type="primary"
                loading={schemaForm.submitting}
                disabled={submitDisabled}
              >
                {submitLabel || t(submiti18nKey as ResourcesWithNamespace)}
              </Button>
            ) : null}
            {afterAction}
          </Space>
        </Row>
      </StickyFooter>
    </Base>
  );
};
