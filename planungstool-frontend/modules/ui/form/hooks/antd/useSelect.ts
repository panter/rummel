import { isBoolean, isString } from 'lodash';

import { OperationVariables } from '@apollo/client';
import { ReferenceSelectorProps } from '../../../../forms/components/antd/input/ReferenceSelect';
import { SelectProps } from 'antd';

const defaultFilter: SelectProps<
  any,
  SingleSelectOptionsType | SingleSelectOptGroupOptionsType
>['filterOption'] = (input, option) => {
  const label = option?.label;
  return Boolean(
    (isString(label) &&
      label.toLowerCase().indexOf(input.toLowerCase()) >= 0) ||
      (option?.keys &&
        option.keys.join(' ').toLowerCase().indexOf(input.toLowerCase()) >= 0),
  );
};

export type SingleSelectOptionsType = {
  label: React.ReactNode;
  value: string | number;
  keys?: string[];
  parentValue?: string | number;
  'data-testid'?: string;
};

export type SingleSelectOptGroupOptionsType = {
  label: React.ReactNode;
  options: SingleSelectOptionsType[];
  keys?: string[];
  selfId?: string | number;
  'data-testid'?: string;
};

export type UseSingleSelect<V = any> = {
  value?: V | null;
  onChange?: (value: V | null | undefined) => void;
  onClear?: () => void;
  options?: SingleSelectOptionsType[] | SingleSelectOptGroupOptionsType[];
  filterOption?: SelectProps['filterOption'];
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
  placeholder?: string;
};

export const useSelect = ({
  value,
  onChange,
  onClear,
  options,
  filterOption,
  loading,
  disabled,
  readOnly,
  showSearch = true,
  allowClear = true,
  placeholder,
}: UseSingleSelect): SelectProps<
  any,
  SingleSelectOptionsType | SingleSelectOptGroupOptionsType
> => {
  return {
    options,
    filterOption:
      isBoolean(filterOption) || filterOption ? filterOption : defaultFilter,
    value: value || undefined,
    loading: !options && loading,
    onChange,
    onClear,
    allowClear,
    showSearch,
    disabled: disabled || readOnly,
    placeholder,
  };
};

export const formReferenceSelectResource = <
  Multi extends true | false,
  ManyData,
  ManyVariables extends OperationVariables,
  Result,
>(
  props: ReferenceSelectorProps<Multi, ManyData, ManyVariables, Result>,
): ReferenceSelectorProps<Multi, ManyData, ManyVariables, Result> => {
  return props;
};
