import { QueryResult, useQuery } from '@apollo/client';
import { Divider, Table, TableColumnType } from 'antd';
import {
  BuildingComponentWhereInput,
  InputMaybe,
} from '../../../../@generated/graphql';

import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import { styled } from 'styled-components';
import { graphql } from '../../../../@generated';
import { gotoMaterialDepotBuildingComponent } from '../../../../lib/locations';
import { dateFormat } from '../../../../utils/date';

export const BuildingComponentListQuery = graphql(/* GraphQL */ `
  query BuildingComponentsQuery(
    $where: BuildingComponentWhereInput
    $orderBy: [BuildingComponentOrderByInput!]
  ) {
    buildingComponents(where: $where, orderBy: $orderBy) {
      id
      name
      componentId
      updatedAt
      dimensions {
        id
        depth
        height
        width
        type
        unit
      }
      category {
        id
        name
      }
      quantity
      quantityUnit
      materialsDepot {
        id
        shortName
      }
      storageLocation {
        id
        name
      }
      searchRequestInterests {
        id
      }
      ...BuildingComponent_ListItem
    }
  }
`);

type MatchingBuildingComponentListProps = {
  style?: React.CSSProperties;
  className?: string;
  filter: InputMaybe<BuildingComponentWhereInput>;
};

const Base = styled.div`
  && {
    flex: 1;
  }
`;

const StyledDivider = styled(Divider)`
  && {
    border-width: 0;
    margin-bottom: 0;

    &:hover {
      box-shadow: none;
    }
  }
`;

const useBuildingComponentColumns = (props: QueryResult) => {
  const { t } = useTranslation();
  const data = props?.data?.buildingComponents || [];

  // todo missing type
  const columns: TableColumnType<any>[] = [
    {
      title: t('common:resources.BuildingComponent.fields.name'),
      key: 'name',
      sorter: true,
      render: (_, props) => (
        <Link
          {...gotoMaterialDepotBuildingComponent(
            props.materialsDepot.id,
            props.id,
          )}
        >
          {props.name}
        </Link>
      ),
    },
    {
      title: t('common:resources.BuildingComponent.fields.componentId'),
      dataIndex: 'componentId',
      sorter: true,
    },
    {
      title: t('common:resources.BuildingComponent.fields.name'),
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: t('common:resources.BuildingComponent.fields.dimensions'),
      dataIndex: 'name',
      sorter: false,
      render: (_, { dimensions }) => dimensions.join(', \n'),
    },
    {
      title: t('common:resources.BuildingComponent.fields.categoryId'),
      dataIndex: 'category',
      sorter: false,
    },
    {
      title: t('common:resources.SearchRequest.fields.quantity'),
      key: 'quantity',
      sorter: false,
      render: (_, { quantity, quantityUnit }) =>
        `${quantity || 0} ${quantityUnit || ''}`,
    },
    {
      title: t('common:common.updateAt'),
      key: 'updatedAt',
      sorter: true,
      render: (_, { updatedAt }) => dayjs(updatedAt).format(dateFormat),
    },
  ];

  return { columns, data };
};

export const MatchingBuildingComponentList: React.FC<
  MatchingBuildingComponentListProps
> = ({ style, className, filter }) => {
  const queryOptions = useQuery(BuildingComponentListQuery, {
    variables: {
      where: filter,
    },
    skip: isEmpty(filter),
  });

  const { columns, data } = useBuildingComponentColumns(queryOptions);

  return (
    <Base style={style} className={className}>
      <StyledDivider dashed={false}>Building components</StyledDivider>
      <Table<any>
        columns={columns}
        pagination={false}
        dataSource={data}
        rowKey="id"
      />
    </Base>
  );
};
