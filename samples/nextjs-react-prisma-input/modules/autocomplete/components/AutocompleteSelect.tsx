import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { AutoComplete, Button, Input } from 'antd';
import React from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import styled from 'styled-components';
import { graphql } from '../../../@generated';
import {
  BaseFormInputProps,
  FormInputController,
  formBaseInputProps,
} from '../../forms/components/antd/input/FormInputController';
import { useAddAutocompleteValue } from '../hooks/useAddAutocompleteValue';
import { useDeleteAutocompleteValue } from '../hooks/useDeleteAutocompleteValue';

const Base = styled.div`
  width: 100%;
  & {
    .ant-select {
      width: 100%;
    }
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  width: 100%;

  > :first-child {
    width: 100%;
  }
`;

export const AutocompleteSelectQuery = graphql(/* GraphQL */ `
  query AutocompleteSelect($where: AutocompleteWhereInput) {
    autocompletes(where: $where) {
      id
      value
    }
  }
`);

export type AutocompleteSelectProps = {
  labelKey?: string;
  onChange?: (value?: string) => void;
  onSelect?: (value?: string) => void;
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  open?: boolean;
  placeholder?: string;
  showAddButton?: boolean;
  showDeleteButton?: boolean;
  onDropdownVisibleChange?: (open: boolean) => void;
  dropdownMatchSelectWidth?: number;
};

export const AutocompleteSelect: React.FC<AutocompleteSelectProps> = ({
  labelKey = 'default',
  onChange,
  onSelect,
  onFocus,
  onBlur,
  onPressEnter,
  value,
  defaultValue,
  autoFocus,
  open,
  readOnly,
  placeholder,
  showAddButton,
  showDeleteButton,
  onDropdownVisibleChange,
  dropdownMatchSelectWidth,
}) => {
  const { data: queryData, loading } = useQuery(AutocompleteSelectQuery, {
    fetchPolicy: 'cache-and-network',
    variables: { where: { key: { equals: labelKey } } },
  });
  const result = queryData?.autocompletes;

  const [addAutocompleteValue] = useAddAutocompleteValue(labelKey, {
    refetchQueries: [AutocompleteSelectQuery],
  });

  const [deleteAutocompleteValue] = useDeleteAutocompleteValue({
    refetchQueries: [AutocompleteSelectQuery],
  });

  const labelsToShow = (
    value
      ? result?.filter((l) =>
          l.value.toLowerCase().startsWith(value.toLowerCase()),
        )
      : result
  )?.map((labelValue) => ({
    label: (
      <OptionWrapper>
        <div>{labelValue.value}</div>
        {showDeleteButton && (
          <div>
            <DeleteOutlined
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                deleteAutocompleteValue(labelValue.id);
                e.preventDefault();
                e.stopPropagation();
              }}
            />
          </div>
        )}
      </OptionWrapper>
    ),
    value: labelValue.value,
  }));

  const valueExists = !value?.trim() || result?.some((r) => r.value === value);
  return (
    <Base>
      {!readOnly ? (
        <AutoComplete
          value={value}
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          onSelect={(_, o) =>
            onSelect ? onSelect(o.value) : onChange?.(o.value)
          }
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          open={open}
          options={labelsToShow}
          onDropdownVisibleChange={onDropdownVisibleChange}
          dropdownMatchSelectWidth={dropdownMatchSelectWidth}
        >
          <Input
            placeholder={placeholder}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onPressEnter?.(e);
              }
            }}
            addonAfter={
              showAddButton ? (
                <Button
                  size="small"
                  onClick={() => {
                    value && addAutocompleteValue(value);
                  }}
                  disabled={valueExists}
                  icon={<PlusCircleFilled />}
                  loading={!result && loading}
                  type="text"
                  style={{ height: 'auto' }}
                />
              ) : undefined
            }
          />
        </AutoComplete>
      ) : (
        <Input
          value={value}
          // onChange={(e) => {
          //   onChange?.(e.target.value);
          // }}
          readOnly={readOnly}
        />
      )}
    </Base>
  );
};

type AutocompleteFormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormInputProps<TFieldValues, TName> & {
  labelKey?: string;
};

export function AutocompleteFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ labelKey, ...props }: AutocompleteFormInputProps<TFieldValues, TName>) {
  const baseFormInputProps = formBaseInputProps(props);

  return (
    <FormInputController
      {...baseFormInputProps}
      render={({ field }) => (
        <AutocompleteSelect
          {...field}
          labelKey={labelKey}
          showAddButton
          showDeleteButton
        />
      )}
    />
  );
}
