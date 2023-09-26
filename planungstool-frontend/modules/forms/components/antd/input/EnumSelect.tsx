import { Select } from 'antd';
import { useTranslation } from 'next-i18next';
import { ReactNode } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import { notNil } from '../../../../ui/core/utils/arrays';
import {
  SingleSelectOptionsType,
  useSelect,
} from '../../../../ui/form/hooks/antd/useSelect';
import styled from 'styled-components';

export type Keys = Record<string, string>;

export type EnumSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  style?: React.CSSProperties;
  className?: string;
  keys: Keys;
  onChange?: (value?: string | null) => void;
  toOption?: (key: string) => SingleSelectOptionsType | undefined;
  value?: string | null;
  i18nPrefix?: string;
  readOnly?: boolean;
  disabled?: boolean;
};

const Base = styled.div`
  width: 100%;
`;

/**
 * Very opnionated to a string enum right now.
 *
 */
export function EnumSelect({
  onChange,
  value,
  style,
  keys,
  toOption,
  i18nPrefix,
  className,
  readOnly,
}: EnumSelectProps): ReactNode {
  const { t } = useTranslation();
  const options = toOption
    ? Object.keys(keys).map(toOption).filter(notNil)
    : defaultOptions(keys, t, i18nPrefix);
  const selectProps = useSelect({
    onChange,
    value,
    options,
    readOnly,
  });

  return (
    <Base className={className} style={style}>
      <Select {...selectProps} style={{ width: '100%' }} />
    </Base>
  );
}

const defaultOptions = (
  keys: Keys,
  t: (key: any) => string,
  i18nPrefix?: string,
): SingleSelectOptionsType[] => {
  const options = Object.keys(keys).map((key) => {
    const label =
      i18nPrefix && keys[key]
        ? t(`${i18nPrefix}.${key}`)
        : keys[key]
        ? keys[key]
        : key;
    return {
      value: keys[key] || key,
      label,
    };
  });
  return options;
};
