import { QueryResult, useQuery } from '@apollo/client';
import { Divider, Table, TableColumnType, Typography } from 'antd';
import {
  InputMaybe,
  SearchRequestWhereInput,
} from '../../../../@generated/graphql';
import {
  gotoProject,
  gotoProjectSearchRequest,
} from '../../../../lib/locations';

import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import { styled } from 'styled-components';
import { graphql } from '../../../../@generated';
import { dateFormat } from '../../../../utils/date';

export const SearchRequestListQuery = graphql(/* GraphQL */ `
  query SearchRequestsQuery(
    $where: SearchRequestWhereInput
    $orderBy: [SearchRequestOrderByInput!]
  ) {
    searchRequests(where: $where, orderBy: $orderBy) {
      id
      buildingComponentName
      quantity
      updatedAt
      quantityUnit
      project {
        id
        shortName
      }
    }
  }
`);

type BuildingComponentListProps = {
  style?: React.CSSProperties;
  className?: string;
  filter: InputMaybe<SearchRequestWhereInput>;
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

const useSearchRequestColumns = (props: QueryResult) => {
  const { t } = useTranslation();
  const data = props?.data?.searchRequests || [];

  const columns: TableColumnType<any>[] = [
    {
      title: t('common:resources.SearchRequest.fields.buildingComponentName'),
      dataIndex: 'buildingComponentName',
      sorter: true,
      render: (_, { project, id, buildingComponentName }) => (
        <Link {...gotoProjectSearchRequest(project.id, id)}>
          {buildingComponentName}
        </Link>
      ),
    },
    {
      title: t('common:resources.SearchRequest.fields.projectId'),
      key: 'project',
      sorter: true,
      render: (_, { project }) => (
        <Link {...gotoProject(project.id)}>{project.shortName}</Link>
      ),
    },
    {
      title: t('common:resources.SearchRequest.fields.quantity'),
      key: 'quantity',
      sorter: (data) => data.quantity,
      render: (_, { quantity, quantityUnit }) => (
        <Typography>
          {quantity} {quantityUnit}
        </Typography>
      ),
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

export const MatchingSearchRequestList: React.FC<
  BuildingComponentListProps
> = ({ style, className, filter }) => {
  const { t } = useTranslation();
  const queryOptions = useQuery(SearchRequestListQuery, {
    variables: {
      where: filter as any,
    },
    skip: isEmpty(filter),
  });

  const { columns, data } = useSearchRequestColumns(queryOptions);

  return (
    <Base style={style} className={className}>
      <StyledDivider dashed={false}>
        {t('common:resources.SearchRequest.breadcrumb.list')}
      </StyledDivider>
      <Table<any>
        columns={columns}
        pagination={false}
        dataSource={data}
        rowKey="id"
      />
    </Base>
  );
};
