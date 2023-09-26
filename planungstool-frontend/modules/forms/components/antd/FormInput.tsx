import { useTranslation } from 'next-i18next';
import { Message, ValidationRule } from 'react-hook-form';
import styled from 'styled-components';
import { ResourcesWithNamespace } from '../../../../@generated/resources';
import { Spacer } from '../../../ui/core/components/Spacer';
import { MessageTypes } from './input/FormInputController';

const FormInputBase = styled.div``;

const FormLabel = styled.label<{ $empty?: boolean; $type: MessageTypes }>`
  margin-left: 2px;
  margin-bottom: 2px;
  line-height: 1.2;
  font-size: 14px;
  display: block;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;

  ${({ theme, $type }) => {
    return !$type
      ? ''
      : `color: ${
          $type === 'error'
            ? theme.antd.colorErrorText
            : $type === 'warning'
            ? theme.antd.colorWarningText
            : theme.antd.colorInfoText
        };`;
  }}

  ${({ $empty }) =>
    !$empty
      ? `
    ::after {
      content: ' ';
      white-space: pre;
    }
  `
      : ''}
`;

const FormInputMessage = styled.div<{ $type: MessageTypes }>`
  font-size: 12px;
  &::after {
    content: ' ';
    white-space: pre;
  }

  /* &:hover {
    span {
      display: inline-block;
      transform: scale(1.2);
      transform-origin: top left;
    }
  } */

  ${({ theme, $type }) => {
    return `color: ${
      $type === 'error'
        ? theme.antd.colorErrorText
        : $type === 'warning'
        ? theme.antd.colorWarningText
        : theme.antd.colorInfoText
    };`;
  }}
`;

const FormInputInput = styled.div`
  display: flex;
  align-items: center;
  min-height: 32px;
`;

/**
 * `empty` always leave space for the label, not matter if label is there or not
 * `false` never leave space for the label
 */
export type FormInputLabel =
  | React.ReactNode
  | string
  | 'empty'
  | false
  | undefined;

export type FormInputProps = {
  style?: React.CSSProperties;
  className?: string;
  message?: React.ReactNode | any;
  messageType?: MessageTypes;
  messageKey?: string;
  messageStyle?: React.CSSProperties;
  label?: FormInputLabel;
  name?: string;
  resourceId?: string;
  required?: Message | ValidationRule<boolean>;
  children: React.ReactNode;
};
export function FormInput({
  style,
  className,
  label,
  name,
  resourceId,
  message,
  messageKey,
  messageStyle,
  messageType = 'error',
  required,
  children,
}: FormInputProps) {
  const { t } = useTranslation();

  const noLabel = label === 'empty' || label === false;
  const labelNode = noLabel
    ? undefined
    : label
    ? label
    : name
    ? t(formInputI18nProp(name, resourceId))
    : '';
  const emptyLabel = label === 'empty';

  return (
    <FormInputBase style={style} className={className}>
      <FormLabel
        $empty={emptyLabel}
        $type={messageKey ? messageType : undefined}
      >
        {required ? `${labelNode || ''} *` : labelNode}
      </FormLabel>
      <FormInputInput>{children}</FormInputInput>
      <Spacer s={1} />
      <FormInputMessage $type={messageType} style={messageStyle}>
        <span>{message}</span>
      </FormInputMessage>
      <Spacer s={3} />
    </FormInputBase>
  );
}

export const formInputI18nProp = (name: string, resourceId?: string) =>
  `common:resources.${
    resourceId || 'default'
  }.fields.${name}` as ResourcesWithNamespace & string;
