import { MaterialsDepotState, SortOrder } from '../../../../@generated/graphql';

import { Button, Row, Space, Upload, UploadProps } from 'antd';
import { Filter } from '../../../filter/components/Filter';
import { FilterPanel } from '../../../filter/components/FilterComponents';
import Link from 'next/link';
import { MaterialsDepotBreadcrump } from '../MaterialsDepotBreadcrump';
import { MaterialsDepotList } from './MaterialsDepotList';
import React from 'react';
import { gotoCreateNewMaterialsDepot } from '../../../../lib/locations';
import { graphql } from '../../../../@generated';
import styled from 'styled-components';
import { useDeleteMaterialsDepot } from '../../hooks/useDeleteMaterialsDepot';
import { useFilteredMaterialDepots } from '../../hooks/useFilteredMaterialDepots';
import { usePrismaManyTable } from '../../../table/hooks/usePrismaManyTable';
import { useTranslation } from 'next-i18next';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getUploadProps } from '../../../../utils/upload';

export const MaterialsDepotListQuery = graphql(/* GraphQL */ `
  query materialsDepotList(
    $where: MaterialsDepotWhereInput
    $orderBy: [MaterialsDepotOrderByInput!]
    $take: Int
  ) {
    materialsDepots(where: $where, orderBy: $orderBy, take: $take) {
      id
      ...MaterialsDepot_List
    }
    materialsDepotsCount(where: $where)
  }
`);

type MaterialsDepotListContainerProps = {
  style?: React.CSSProperties;
  className?: string;
};

const Base = styled.div``;

export const MaterialsDepotListContainer: React.FC<
  MaterialsDepotListContainerProps
> = ({ style, className }) => {
  const { t } = useTranslation();

  const { setWhere, queryResult, take, setTake } = usePrismaManyTable(
    MaterialsDepotListQuery,
    (data) => data.materialsDepotsCount,
    {
      take: 12,
      pageSize: 12,
      orderBy: [{ createdAt: SortOrder.Desc }],
    },
  );

  const { onDelete } = useDeleteMaterialsDepot({
    onSuccess: () => queryResult.refetch(),
  });

  const { filterConfig, filter, setFilter } = useFilteredMaterialDepots({
    setWhere,
    initialFilter: {
      state: [MaterialsDepotState.Active, MaterialsDepotState.Draft],
    },
  });

  const uploadProps: UploadProps = getUploadProps('materials-depot', {});

  return (
    <Base style={style} className={className}>
      <MaterialsDepotBreadcrump />
      <FilterPanel>
        <Filter
          filterConfig={filterConfig}
          filter={filter}
          onChange={setFilter}
        />
        <Space>
          <Link {...gotoCreateNewMaterialsDepot()}>
            <Button icon={<PlusOutlined />} />
          </Link>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>
              {t('common:common.import')}
            </Button>
          </Upload>
        </Space>
      </FilterPanel>
      <MaterialsDepotList
        onDelete={onDelete}
        materialsDepots={queryResult.data?.materialsDepots}
      />
      {/*  load more */}
      <Row justify="center">
        <Space style={{ padding: '8px' }}>
          <Button
            onClick={() => {
              setTake((take || 12) + 12);
            }}
          >
            Load more
          </Button>
        </Space>
      </Row>
    </Base>
  );
};
