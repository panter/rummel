import {
  CheckOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { Button, Space, Table, TableColumnType, Tag, Tooltip } from 'antd';
import React, { useState } from 'react';
import {
  AcceptSearchRequestInterestInput,
  SearchRequestInterestState,
  SearchRequestInterestWhereInput,
  SearchRequestInterestsQuery,
  SortOrder,
} from '../../../../@generated/graphql';
import {
  gotoBuildingComponent,
  gotoMaterialsDepot,
  gotoProject,
  gotoProjectSearchRequest,
  gotoSearchRequestInterest,
} from '../../../../lib/locations';

import dayjs from 'dayjs';
import { lowerCase } from 'lodash';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { graphql } from '../../../../@generated';
import { PublicRuntimeConfig } from '../../../../lib/config';
import { dateFormat } from '../../../../utils/date';
import { Filter } from '../../../filter/components/Filter';
import { FilterPanel } from '../../../filter/components/FilterComponents';
import { usePrismaManyTable } from '../../../table/hooks/usePrismaManyTable';
import { useAcceptSearchRequestInterest } from '../../hooks/useAcceptSearchRequestInterest';
import { useDeleteSearchRequestInterest } from '../../hooks/useDeleteSearchRequestInterest';
import { useFilteredSearchInterestRequest } from '../../hooks/useFilteredSearchInterestRequest';
import { useRejectSearchRequestInterest } from '../../hooks/useRejectSearchRequestInterest';
import { SearchRequestInterestAcceptForm } from '../form/SearchRequestInterestAcceptForm';
import { SearchRequestInterestRejectionForm } from '../form/SearchRequestInterestRejectionForm';

export const ManySearchRequestInterestQuery = graphql(/* GraphQL */ `
  query searchRequestInterests(
    $where: SearchRequestInterestWhereInput
    $orderBy: [SearchRequestInterestOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    searchRequestInterests(
      where: $where
      orderBy: $orderBy
      take: $take
      skip: $skip
    ) {
      id
      responsibleUser {
        id
        email
      }
      state
      rejectionReason
      rejectedAt
      createdAt
      searchRequest {
        id
        buildingComponentName
        assignedBuildingComponentsCount
        reservedBuildingComponentsCount
        category {
          id
          name
        }
        project {
          id
          name
          shortName
        }
        ebkphCategory {
          id
          name
        }
        quantity
        huntingStatusNotes
        quantityUnit
        deadlineFound
      }
      buildingComponent {
        id
        name
        quantity
        quantityUnit
        materialsDepot {
          id
          shortName
        }
      }
    }
    searchRequestInterestsCount(where: $where)
  }
`);

const useSearchRequestInterestColumns = (props: {
  refresh: () => void;
  projectsQuery?: SearchRequestInterestsQuery;
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const data = props.projectsQuery?.searchRequestInterests;

  const [rejectInterest] = useRejectSearchRequestInterest();
  const [acceptInterest, { error }] = useAcceptSearchRequestInterest();
  const [deleteInterest] = useDeleteSearchRequestInterest();

  const [open, setOpen] = useState<'accept' | 'reject' | undefined>(undefined);
  const [, setConfirmLoading] = useState(false);

  const showModal = (formType: 'accept' | 'reject') => {
    setOpen(formType);
  };

  const onReject = (id: string, rejectionReason?: string) => {
    setConfirmLoading(true);
    rejectInterest({
      interestId: id,
      rejectionReason,
    }).then(() => {
      setConfirmLoading(false);
      setOpen(undefined);
      props.refresh();
    });
  };

  const onAccept = (
    interestId: string,
    input: AcceptSearchRequestInterestInput,
  ) => {
    setConfirmLoading(true);
    acceptInterest({ ...input, interestId }).then(() => {
      setConfirmLoading(false);
      setOpen(undefined);
      props.refresh();
    });
  };

  const columns: TableColumnType<
    SearchRequestInterestsQuery['searchRequestInterests'][0]
  >[] = [
    {
      title: t('common:resources.SearchRequestInterest.fields.project'),
      dataIndex: 'searchRequest.project.id',
      render: (_, { searchRequest, id }) =>
        searchRequest.project && (
          <Link {...gotoProject(searchRequest.project.id)}>
            {searchRequest?.project?.shortName}
          </Link>
        ),
      sorter: true,
    },

    {
      title: t('common:resources.SearchRequest.fields.buildingComponent.name'),
      dataIndex: 'buildingComponent.name',
      sorter: true,
      render: (_, interest) => (
        <Link {...gotoBuildingComponent(interest.buildingComponent.id)}>
          {interest.buildingComponent?.name}
        </Link>
      ),
    },
    {
      title: t(
        'common:resources.SearchRequest.fields.buildingComponent.materialsDepot',
      ),
      dataIndex: 'buildingComponent.materialsDepot.shortName',
      sorter: true,
      render: (_, interest) => (
        <Link
          {...gotoMaterialsDepot(interest.buildingComponent.materialsDepot.id)}
        >
          {interest.buildingComponent.materialsDepot.shortName}
        </Link>
      ),
    },
    {
      title: t('common:resources.SearchRequest.fields.searchRequest'),
      dataIndex: 'searchRequest.buildingComponentName',
      render: (_, interest) => (
        <Link
          {...gotoProjectSearchRequest(
            interest.searchRequest.project.id,
            interest.searchRequest.id,
          )}
        >
          {interest.searchRequest.buildingComponentName}
        </Link>
      ),
      sorter: true,
    },
    {
      title: t('common:resources.SearchRequest.fields.categoryId'),
      dataIndex: 'searchRequest.category.name',
      render: (_, { searchRequest, id }) => searchRequest.category?.name,
      sorter: true,
    },
    {
      title: t('common:resources.SearchRequest.fields.ebkphCategoryId'),
      dataIndex: 'searchRequest.ebkphCategory.name',
      render: (_, { searchRequest, id }) => searchRequest.ebkphCategory?.name,
      sorter: true,
    },
    {
      title: t('common:resources.SearchRequest.fields.quantity'),
      dataIndex: 'searchRequest.quantity',
      render: (_, { searchRequest, id }) => searchRequest.quantity,
      sorter: false,
    },
    {
      title: t('common:resources.SearchRequest.fields.assignedQuantity'),
      dataIndex: 'assignedBuildingComponentsCount',
      render: (_, { searchRequest, id }) =>
        searchRequest.assignedBuildingComponentsCount || '',
      sorter: false,
    },
    {
      title: t('common:resources.SearchRequest.fields.reservedQuantity'),
      dataIndex: 'reservedBuildingComponentsCount',
      render: (_, { searchRequest, id }) =>
        searchRequest.reservedBuildingComponentsCount || '',
      sorter: false,
    },
    {
      title: t('common:resources.SearchRequest.fields.quantityUnit'),
      dataIndex: 'searchRequest.quantityUnit',
      render: (_, { searchRequest, id }) => searchRequest.quantityUnit,
      sorter: false,
    },
    {
      title: t('common:resources.SearchRequestInterest.fields.state'),
      dataIndex: 'state',
      sorter: true,
      render: (_, { state }) => (
        <Tag
          color={
            state === SearchRequestInterestState.Rejected
              ? 'red'
              : state === SearchRequestInterestState.Accepted
              ? 'green'
              : 'blue'
          }
        >
          {t(`common:enums.SearchRequestInterestState.${state}`)}
        </Tag>
      ),
    },
    {
      title: t('common:resources.SearchRequestInterest.fields.responsibleUser'),
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
      dataIndex: 'searchRequest.deadlineFound',
      render: (_, { searchRequest, id }) =>
        searchRequest.deadlineFound &&
        dayjs(searchRequest.deadlineFound).format(dateFormat),
      sorter: true,
    },
    {
      title: t('common:common.actions'),
      key: 'action',
      fixed: 'right',
      render: (_, searchRequestInterest) => (
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Space size="middle">
            {/*TODO: show only if current user is searchRequest.responsiblePerson */}
            {/*TODO: also, use confirmation dialog*/}
            <Tooltip
              title={
                searchRequestInterest.state === SearchRequestInterestState.Open
                  ? 'Vorschlag bearbeiten'
                  : 'Die Bearbeitung ist nur für offene Vorschläge möglich'
              }
            >
              <Button
                disabled={
                  searchRequestInterest.state !==
                  SearchRequestInterestState.Open
                }
                icon={<EditOutlined />}
                onClick={() =>
                  router.push(
                    gotoSearchRequestInterest(searchRequestInterest.id, {
                      projectId: searchRequestInterest.searchRequest.project.id,
                      searchRequestId: searchRequestInterest.searchRequest.id,
                    }).href,
                  )
                }
              />
            </Tooltip>
            {searchRequestInterest.state === SearchRequestInterestState.Open ? (
              <Tooltip title="Vorschlag ablehnen">
                <Button
                  danger
                  icon={<StopOutlined />}
                  onClick={() => showModal('reject')}
                ></Button>
                <SearchRequestInterestRejectionForm
                  open={open === 'reject'}
                  onCreate={(values) =>
                    onReject(searchRequestInterest.id, values.rejectionReason)
                  }
                  onCancel={() => {
                    setOpen(undefined);
                  }}
                />
              </Tooltip>
            ) : null}
            {searchRequestInterest.state === SearchRequestInterestState.Open ? (
              <Tooltip title="Vorschlag annehmen">
                <Button
                  icon={<CheckOutlined />}
                  onClick={() => showModal('accept')}
                ></Button>
                <SearchRequestInterestAcceptForm
                  open={open === 'accept'}
                  error={error}
                  onCreate={(values) =>
                    onAccept(searchRequestInterest.id, values)
                  }
                  onCancel={() => {
                    setOpen(undefined);
                  }}
                  searchRequestInterest={searchRequestInterest}
                />
              </Tooltip>
            ) : null}
            {/*delete button*/}
            <Tooltip title="Vorschlag löschen">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() =>
                  deleteInterest({ id: searchRequestInterest.id }).finally(() =>
                    props.refresh(),
                  )
                }
              ></Button>
            </Tooltip>
          </Space>
        </div>
      ),
    },
  ];

  return { columns, data };
};

export type SearchRequestInterestsTableProps = {
  where?: SearchRequestInterestWhereInput;
  additionalActions?: React.ReactNode;
};

export const SearchRequestInterestsTable: React.FC<
  SearchRequestInterestsTableProps
> = ({ where, additionalActions }) => {
  const { t } = useTranslation();
  const tableOptions = usePrismaManyTable(
    ManySearchRequestInterestQuery,
    (data) => data.searchRequestInterestsCount,
    {
      take: 100,
      orderBy: [{ updatedAt: SortOrder.Desc }],
      where,
    },
  );

  const { filterConfig, filter, setFilter } = useFilteredSearchInterestRequest({
    setWhere: (_where) =>
      tableOptions.setWhere({
        ..._where,
        ...where,
      }),
    initialFilter: {
      state: [lowerCase(SearchRequestInterestState.Open)],
    },
  });

  const { columns, data } = useSearchRequestInterestColumns({
    refresh: tableOptions.queryResult.refetch,
    projectsQuery: tableOptions.queryResult.data,
  });

  const backendEndpoint = PublicRuntimeConfig.getOrThrow('GRAPHQL_ENDPOINT');
  const exportLink = `${backendEndpoint}/search-request-interest/export/csv`;

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
            <>
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
            </>
          ) : null}
          {additionalActions}
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
