import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { AddNewFilter } from './AddNewFilter';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import { mediaQueries } from '../../../lib/mediaQuery';

export type FilterShortcut = { label: string; action: () => void };

export type FilterProperty<V> = {
  actions?: FilterShortcut[];
  label: string;
  show: (value?: V | null) => boolean;
  render: (props: {
    value?: V | null;
    onChange?: (v: V | null) => void;
    active: boolean;
  }) => ReactNode;
};

export type FilterConfig<T> = {
  [P in keyof T]: NonNullable<FilterProperty<T[P]>>;
};

export type FullFilterProperty = {
  key: string;
  config: FilterProperty<any>;
  data: any;
};

const Base = styled.div`
  display: flex;
  background: #ffffff;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  min-height: 36px;
  border: 1px solid #d9d9d9;
  flex-wrap: wrap;
  border-radius: ${({ theme }) => theme.antd.borderRadius}px;

  ${mediaQueries.sm`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    * > div {
    margin-right: 6px;

    :last-child {
      // margin-right: 0;
    }
  }
  `}
`;

export const AddFirstFilter = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.antd.fontSize}px;
`;

export interface FilterProps<T> {
  style?: Record<string, any>;
  className?: string;
  filterConfig: FilterConfig<T>;
  filter: T;
  onChange?: (f: T) => void;
}

export function Filter<T>({
  style,
  className,
  filterConfig,
  filter,
  onChange,
}: FilterProps<T>) {
  const { t } = useTranslation();
  const [newFilter, setNewFilter] = useState<string>();
  const [keySort, setKeySort] = useState(
    Object.keys(filterConfig).reduce<Record<string, any>>(
      (c, k) => ({ [k]: c[k] }),
      {},
    ),
  );
  const allFilters = Object.keys(filterConfig).map<FullFilterProperty>(
    (key, i) => ({
      key,
      config: (filterConfig as any)[key],
      data: (filter as any)[key],
      sort: i,
    }),
  );

  const allActiveFilters = allFilters.filter(
    (f) => f.key === newFilter || f.config.show(f.data),
  );
  return (
    <Base style={style} className={className}>
      {allActiveFilters
        .sort((a, b) => keySort[a.key] - keySort[b.key])
        .map((f) => {
          return (
            <div key={f.key}>
              {f.config.render({
                value: f.data,
                active: f.key === newFilter,
                onChange: (v) => {
                  setNewFilter(undefined);
                  onChange?.({ ...filter, [f.key]: v });
                },
              })}
            </div>
          );
        })}
      {!newFilter ? (
        <AddNewFilter
          style={{ marginLeft: 12 }}
          fullFilter={allFilters}
          onNew={(p) => {
            p && setKeySort({ ...keySort, [p.key]: new Date().getTime() });
            setNewFilter(p?.key);
          }}
        >
          {!allActiveFilters.length ? (
            <AddFirstFilter>{t('common.addFilter')}</AddFirstFilter>
          ) : (
            <div style={{ paddingBottom: '6px' }}>
              <PlusOutlined />
            </div>
          )}
        </AddNewFilter>
      ) : null}
    </Base>
  );
}
