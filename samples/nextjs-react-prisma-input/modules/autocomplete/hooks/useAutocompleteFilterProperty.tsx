import { Select } from 'antd';
import { isArray, last } from 'lodash';
import { useState } from 'react';
import { styled } from 'styled-components';
import { FilterProperty, FilterShortcut } from '../../filter/components/Filter';
import {
  FilterItem,
  FilterItemLabel,
} from '../../filter/components/FilterComponents';
import { notNil } from '../../ui/core/utils/arrays';
import { AutocompleteSelect } from '../components/AutocompleteSelect';

const BorderlessSelect = styled(Select)`
  &&& {
    .ant-select-selector {
      border: 0;
    }
  }
`;

const BorderlessAutocomplete = styled(AutocompleteSelect)`
  &&& {
    min-width: 120px;

    .ant-select-selector {
      border: 0;
    }
  }
`;

type AutocompleteFilterItemProps = {
  labelKey: string;
  value?: string | null;
  onChange?: (v?: string | null) => void;
  active?: boolean;
  open?: boolean;
};

export function AutocompleteFilterItem({
  labelKey,
  value,
  onChange,
  active,
}: AutocompleteFilterItemProps): React.ReactElement {
  const [activated, setActivated] = useState(active);

  return (
    <div>
      {active || activated ? (
        <BorderlessAutocomplete
          autoFocus
          labelKey={labelKey}
          onFocus={() => setActivated(true)}
          onBlur={() => setActivated(false)}
          defaultValue={value || undefined}
          open
          onPressEnter={(e) => {
            onChange?.(e.currentTarget.value || undefined);
            setActivated(false);
          }}
          onSelect={(v) => {
            onChange?.(v);
            setActivated(false);
          }}
        />
      ) : (
        <BorderlessSelect<any>
          onFocus={() => setActivated(true)}
          onBlur={() => setActivated(false)}
          allowClear={false}
          mode={'tags'}
          notFoundContent={null}
          open={false}
          value={value ? [value] : undefined}
          onChange={(e: any) => {
            e ? onChange?.(isArray(e) ? last(e) : e) : null;
          }}
          // onDropdownVisibleChange={(open: any) => !open && onChange?.(value)}
          // dropdownMatchSelectWidth={180}
        />
      )}
    </div>
  );
}

export const useAutocompleteFilterProperty = ({
  labelKey,
  label,
  actions,
}: {
  labelKey: string;
  label: string;
  actions?: FilterShortcut[];
}): FilterProperty<string | null | undefined> => {
  return {
    actions,
    label,
    show: (value) => notNil(value),
    render: ({ value, onChange, active }) => (
      <FilterItem>
        <FilterItemLabel>{label}</FilterItemLabel>
        <AutocompleteFilterItem
          labelKey={labelKey}
          value={value}
          onChange={onChange}
          active={active}
        />
      </FilterItem>
    ),
  };
};
