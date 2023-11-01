import { FilterItem, FilterItemLabel } from './FilterComponents';
import { FilterProperty, FilterShortcut } from './Filter';
import { Input, Select } from 'antd';
import { ReactElement, useState } from 'react';
import { isArray, isBoolean, isEmpty, last } from 'lodash';
import { notNil } from '../../ui/core/utils/arrays';
import styled from 'styled-components';
import { NumberInput } from '@rummel/react-forms-ant';

const BorderlessSelect = styled(Select)`
  &&& {
    .ant-select-selector {
      border: 0;
    }
  }
`;

export type SelectFilterOption<T extends string | number> = {
  id: T;
  label: string;
};

type SelectFilterItem<T, V extends string | number> = {
  value?: T | null;
  onChange?: (v?: T | null) => void;
  values?: SelectFilterOption<V>[] | null;
  active?: boolean;
  mode?: 'multiple' | 'tags';
  open?: boolean;
  min?: V extends number ? number : never;
  max?: V extends number ? number : never;
};

export function SelectFilterItem<T extends string>({
  value,
  onChange,
  active,
  values,
}: SelectFilterItem<T[], T>): ReactElement {
  return (
    <div>
      <BorderlessSelect<any>
        autoFocus={active}
        defaultOpen={active}
        allowClear={false}
        mode="multiple"
        showArrow
        value={value || []}
        onChange={(e: any) => {
          e ? onChange?.(isArray(e) ? e : [e]) : null;
        }}
        onDropdownVisibleChange={(open: any) => !open && onChange?.(value)}
        dropdownMatchSelectWidth={180}
      >
        {values?.map(({ id, label }) => (
          <Select.Option key={id} value={id}>
            {label}
          </Select.Option>
        ))}
      </BorderlessSelect>
    </div>
  );
}

export const useMultiSelectFilterProperty = <T extends string>({
  label,
  values,
  actions,
}: {
  label: string;
  values?: SelectFilterOption<T>[] | null;
  actions?: FilterShortcut[];
}): FilterProperty<T[] | null | undefined> => {
  return {
    actions,
    label,
    show: (value) => !isEmpty(value),
    render: ({ value, onChange, active }) => (
      <FilterItem>
        <FilterItemLabel>{label}</FilterItemLabel>
        <SelectFilterItem<T>
          value={value}
          onChange={onChange}
          active={active}
          values={values}
          open={false}
        />
      </FilterItem>
    ),
  };
};

export function SelectSingleValueFilterItem<T extends string | number>({
  value,
  onChange,
  active,
  values,
  mode = 'multiple',
  min,
  max,
}: SelectFilterItem<T, T>): React.ReactElement {
  const [activated, setActivated] = useState(active);

  return (
    <div>
      {mode === 'multiple' || (!active && !activated) ? (
        <BorderlessSelect<any>
          onFocus={() => setActivated(true)}
          onBlur={() => setActivated(false)}
          autoFocus={mode === 'multiple'}
          defaultOpen={mode === 'multiple'}
          allowClear={false}
          mode={mode}
          notFoundContent={null}
          open={mode === 'tags' ? false : undefined}
          value={value ? [value] : undefined}
          onChange={(e: any) => {
            e ? onChange?.(isArray(e) ? last(e) : e) : null;
          }}
          onDropdownVisibleChange={(open: any) => !open && onChange?.(value)}
          dropdownMatchSelectWidth={180}
        >
          {values?.map(({ id, label }) => (
            <Select.Option key={id} value={id}>
              {label}
            </Select.Option>
          ))}
        </BorderlessSelect>
      ) : (
        <Input
          type={min !== undefined || max !== undefined ? 'number' : 'text'}
          onFocus={() => setActivated(true)}
          onBlur={(e: any) => {
            onChange?.(
              e.currentTarget.value
                ? ((min !== undefined || max !== undefined
                    ? Number(e.currentTarget.value)
                    : e.currentTarget.value) as T)
                : undefined,
            );
            setActivated(false);
          }}
          autoFocus
          defaultValue={value || undefined}
          onPressEnter={(e) => {
            onChange?.(
              e.currentTarget.value
                ? ((min !== undefined || max !== undefined
                    ? Number(e.currentTarget.value)
                    : e.currentTarget.value) as T)
                : undefined,
            );
            setActivated(false);
          }}
          min={min}
          max={max}
        />
      )}
    </div>
  );
}

export function NumberFilterItem<T extends string | number>({
  value,
  onChange,
  active,
  min,
  max,
}: SelectFilterItem<T, T>): React.ReactElement {
  const [activated, setActivated] = useState(active);

  return (
    <NumberInput
      formatValue={(n) => String(n)}
      onFocus={() => setActivated(true)}
      onBlur={(e: any) => {
        onChange?.(
          e.currentTarget.value
            ? (Number(e.currentTarget.value) as T)
            : undefined,
        );
        setActivated(false);
      }}
      autoFocus
      defaultValue={value || undefined}
      min={min}
      max={max}
    />
  );
}

export const useSingleSelectFilterProperty = <T extends string>({
  label,
  values,
  actions,
}: {
  label: string;
  values?: SelectFilterOption<T>[] | null;
  actions?: FilterShortcut[];
}): FilterProperty<T | null | undefined> => {
  return {
    actions,
    label,
    show: (value) => notNil(value),
    render: ({ value, onChange, active }) => (
      <FilterItem>
        <FilterItemLabel>{label}</FilterItemLabel>
        <SelectSingleValueFilterItem<T>
          value={value}
          onChange={onChange}
          active={active}
          values={values}
        />
      </FilterItem>
    ),
  };
};

export const useStringFilterProperty = <T extends string>({
  label,
  actions,
}: {
  label: string;
  actions?: FilterShortcut[];
}): FilterProperty<T | null | undefined> => {
  return {
    actions,
    label,
    show: (value) => notNil(value),
    render: ({ value, onChange, active }) => (
      <FilterItem>
        <FilterItemLabel>{label}</FilterItemLabel>
        <SelectSingleValueFilterItem<T>
          value={value}
          onChange={onChange}
          active={active}
          mode="tags"
        />
      </FilterItem>
    ),
  };
};

export const useNumberFilterProperty = <T extends number>({
  label,
  actions,
  min,
  max,
}: {
  label: string;
  actions?: FilterShortcut[];
  min?: T extends number ? number : never;
  max?: T extends number ? number : never;
}): FilterProperty<T | null | undefined> => {
  return {
    actions,
    label,
    show: (value) => notNil(value),
    render: ({ value, onChange, active }) => (
      <FilterItem>
        <FilterItemLabel>{label}</FilterItemLabel>
        <SelectSingleValueFilterItem<T>
          value={value}
          onChange={onChange}
          active={active}
          mode="tags"
          min={min}
          max={max}
        />
      </FilterItem>
    ),
  };
};

export const useBooleanFilterProperty = ({
  label,
  values,
  actions,
}: {
  label: string;
  values?: { trueLabel: string; falseLabel: string } | null;
  actions?: FilterShortcut[];
}): FilterProperty<boolean | null | undefined> => {
  return {
    actions,
    label,
    show: (value) => isBoolean(value),
    render: ({ value, onChange, active }) => (
      <FilterItem>
        <FilterItemLabel>{label}</FilterItemLabel>
        <SelectSingleValueFilterItem<'true' | 'false'>
          value={notNil(value) ? `${value}` : undefined}
          onChange={(v) =>
            onChange?.(v === 'true' ? true : v === 'false' ? false : v)
          }
          active={active}
          values={
            values
              ? [
                  { id: 'true', label: values?.trueLabel },
                  { id: 'false', label: values?.falseLabel },
                ]
              : []
          }
        />
      </FilterItem>
    ),
  };
};
