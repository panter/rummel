import {
  DownloadOutlined,
  EditOutlined,
  FileSearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Space, Table, TableColumnType, Typography } from 'antd';
import {
  SearchRequestsQuery,
  SearchRequestState,
  SortOrder,
} from '../../../../@generated/graphql';
import {
  gotoCreateNewSearchRequestFromProject,
  gotoListOfSearchRequestInterests,
  gotoProject,
  gotoProjectSearchRequest,
} from '../../../../lib/locations';
import { capitalize } from 'lodash';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { graphql } from '../../../../@generated';
import { Filter } from '../../../filter/components/Filter';
import { FilterPanel } from '../../../filter/components/FilterComponents';
import { usePrismaManyTable } from '../../../table/hooks/usePrismaManyTable';
import { useFilteredSearchRequest } from '../../hooks/useFilteredSearchRequest';
import { PublicRuntimeConfig } from '../../../../lib/config';
import { Date } from '../../../ui/elements/date';

export const ManySearchRequestQuery = graphql(/* GraphQL */ `
  query searchRequests(
    $where: SearchRequestWhereInput
    $orderBy: [SearchRequestOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    searchRequests(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      state
      responsibleUser {
        id
        email
      }
      project {
        id
        shortName
      }
      category {
        id
        name
      }
      ebkphCategory {
        id
        name
      }
      reservedBuildingComponentsCount
      assignedBuildingComponentsCount
      buildingComponentName
      quantity
      quantityUnit
      deadlineFound
    }
    searchRequestsCount(where: $where)
  }
`);

const useSearchRequestColumns = (props: {
  refresh: () => void;
  searchRequestsQuery?: SearchRequestsQuery;
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const data = props.searchRequestsQuery?.searchRequests;

  const columns: TableColumnType<SearchRequestsQuery['searchRequests'][0]>[] = [
    {
      title: t('common:resources.SearchRequest.fields.projectId'),
      key: 'project.id',
      render: (_, { project }) => (
        <Link {...gotoProject(project.id)}>{project.shortName}</Link>
      ),
    },
    {
      title: t('common:resources.SearchRequest.fields.buildingComponentName'),
      dataIndex: 'buildingComponentName',
      sorter: true,
    },
    {
      title: t('common:resources.SearchRequest.fields.categoryId'),
      dataIndex: 'searchRequest.category.name',
      render: (_, { category }) => category?.name,
      sorter: true,
    },
    {
      title: t('common:resources.SearchRequest.fields.ebkphCategoryId'),
      dataIndex: 'searchRequest.ebkphCategory.name',
      render: (_, { ebkphCategory }) => ebkphCategory?.name,
      sorter: true,
    },
    {
      title: t('common:resources.SearchRequest.fields.quantity'),
      key: 'quantity',
      sorter: false,
      render: (_, { quantity, quantityUnit }) => (
        <Typography>
          {quantity} {quantityUnit}
        </Typography>
      ),
    },
    {
      title: t('common:resources.SearchRequest.fields.assignedQuantity'),
      dataIndex: 'assignedBuildingComponentsCount',
      render: (_, { assignedBuildingComponentsCount, id }) =>
        assignedBuildingComponentsCount || '',
      sorter: false,
    },
    {
      title: t('common:resources.SearchRequest.fields.reservedQuantity'),
      dataIndex: 'reservedBuildingComponentsCount',
      render: (_, { reservedBuildingComponentsCount, id }) =>
        reservedBuildingComponentsCount || '',
      sorter: false,
    },
    {
      title: t('common:resources.SearchRequest.fields.quantityUnit'),
      dataIndex: 'quantityUnit',
      sorter: false,
    },
    {
      title: t('common:common.status'),
      dataIndex: 'state',
      key: 'state',
      sorter: true,
      render: (state: SearchRequestState) =>
        // @ts-ignore
        t(`common:enums:SearchRequestState.${capitalize(state)}`),
    },
    {
      title: t('common:resources.SearchRequest.fields.responsibleUserId'),
      dataIndex: 'responsibleUser.email',
      render: (_, { responsibleUser }) => (
        <Link
          href="#"
          onClick={(e) => {
            window.location.href = `mailto:${responsibleUser.email}`;
            e.preventDefault();
          }}
        >
          {responsibleUser.email}
        </Link>
      ),
      sorter: true,
    },
    {
      title: t('common:resources.SearchRequest.fields.deadlineFound'),
      key: 'deadlineFound',
      dataIndex: 'deadlineFound',
      sorter: true,
      render: (_, { deadlineFound }) => <Date date={deadlineFound} />,
    },

    {
      title: t('common:common.actions'),
      key: 'action',
      fixed: 'right',
      render: (_, { id, project }) => (
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Space size="middle">
            <Button
              icon={<FileSearchOutlined />}
              onClick={() =>
                router.push(
                  gotoListOfSearchRequestInterests({ searchRequestId: id })
                    .href,
                )
              }
            />

            <Button
              icon={<EditOutlined />}
              onClick={() =>
                router.push(gotoProjectSearchRequest(project.id, id).href)
              }
            />
          </Space>
        </div>
      ),
    },
  ];

  return { columns, data };
};

export type SearchRequestsTableProps = {
  projectId?: string;
};

export const SearchRequestsTable: React.FC<SearchRequestsTableProps> = ({
  projectId,
}) => {
  const { t } = useTranslation();

  const backendEndpoint = PublicRuntimeConfig.getOrThrow('GRAPHQL_ENDPOINT');
  let exportLink = `${backendEndpoint}/search-request/export/csv`;
  if (projectId) {
    exportLink += `?projectId=${projectId}`;
  }

  const tableOptions = usePrismaManyTable(
    ManySearchRequestQuery,
    (data) => data.searchRequestsCount,
    {
      where: projectId ? { project: { id: { equals: projectId } } } : undefined,
      take: 100,
      orderBy: [{ createdAt: SortOrder.Desc }],
    },
  );

  const { columns, data } = useSearchRequestColumns({
    refresh: tableOptions.queryResult.refetch,
    searchRequestsQuery: tableOptions.queryResult.data,
  });

  const { filterConfig, filter, setFilter } = useFilteredSearchRequest({
    setWhere: (_where) =>
      tableOptions.setWhere({
        ..._where,
        ...(projectId ? { project: { id: { equals: projectId } } } : {}),
      }),
    initialFilter: {
      state: [SearchRequestState.Active, SearchRequestState.Draft],
    },
  });

  return (
    <div>
      <FilterPanel>
        <Filter
          filterConfig={filterConfig}
          filter={filter}
          onChange={setFilter}
        />
        <Space>
          {data?.length ? (
            <Link
              href={exportLink}
              target="_blank"
              rel="noreferrer"
              download="search-request-interest"
              passHref
            >
              <Button icon={<DownloadOutlined />}>
                {t('common:common.export')}
              </Button>
            </Link>
          ) : null}
          {projectId && (
            <Link {...gotoCreateNewSearchRequestFromProject(projectId)}>
              <Button icon={<PlusOutlined />} />
            </Link>
          )}
        </Space>
      </FilterPanel>
      <Table<any>
        scroll={{ x: true }}
        columns={columns}
        dataSource={data || []}
        rowKey="id"
        pagination={tableOptions.pagination}
        onChange={tableOptions.handleTableChange}
      />
    </div>
  );
};
