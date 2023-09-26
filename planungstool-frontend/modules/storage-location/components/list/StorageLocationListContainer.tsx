import { Button } from 'antd';
import { Filter } from '../../../filter/components/Filter';
import { FilterPanel } from '../../../filter/components/FilterComponents';
import Link from 'next/link';
import React from 'react';
import { SortOrder } from '../../../../@generated/graphql';
import { StorageLocationBreadcrumb } from '../StorageLocationBreadcrump';
import { StorageLocationList } from './StorageLocationList';
import { gotoCreateNewStorageLocation } from '../../../../lib/locations';
import { graphql } from '../../../../@generated';
import styled from 'styled-components';
import { useFilteredStorageLocations } from '../../hooks/useFilteredStorageLocations';
import { usePrismaManyTable } from '../../../table/hooks/usePrismaManyTable';
import { useTranslation } from 'next-i18next';
import { PlusOutlined } from '@ant-design/icons';

export const StorageLocationListQuery = graphql(/* GraphQL */ `
  query storageLocationList(
    $where: StorageLocationWhereInput
    $orderBy: [StorageLocationOrderByInput!]
  ) {
    storageLocations(where: $where, orderBy: $orderBy) {
      id
      name
      ...StorageLocation_List
    }
    storageLocationsCount(where: $where)
  }
`);

type StorageLocationListContainerProps = {
  style?: React.CSSProperties;
  className?: string;
};

const Base = styled.div``;

export const StorageLocationListContainer: React.FC<
  StorageLocationListContainerProps
> = ({ style, className }) => {
  const { t } = useTranslation();
  const { setWhere, queryResult } = usePrismaManyTable(
    StorageLocationListQuery,
    (data) => data.storageLocationsCount,
    {
      take: 9999,
      orderBy: [{ updatedAt: SortOrder.Desc }],
    },
  );

  const { filterConfig, filter, setFilter } = useFilteredStorageLocations({
    setWhere: setWhere,
  });

  return (
    <Base style={style} className={className}>
      <StorageLocationBreadcrumb />
      <FilterPanel>
        <Filter
          filterConfig={filterConfig}
          filter={filter}
          onChange={setFilter}
        />
        <Link {...gotoCreateNewStorageLocation()}>
          <Button icon={<PlusOutlined />} />
        </Link>
      </FilterPanel>
      <StorageLocationList
        storageLocations={queryResult.data?.storageLocations}
      />
    </Base>
  );
};
