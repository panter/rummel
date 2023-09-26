import { Button, Space, Table, TableColumnType } from 'antd';
import {
  EbkphCategoriesTableQuery as EbkphCategoriesTableQueryType,
  EbkphCategory,
  SortOrder,
} from '../../../@generated/graphql';
import {
  EbkphCategoryCreateResource,
  EbkphCategoryUpdateResource,
} from '../resource';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

import { EbkphCategoryForm } from './EbkphCategoryForm';
import { Filter } from '../../filter/components/Filter';
import { FilterPanel } from '../../filter/components/FilterComponents';
import { GraphqlSchemaFormModal } from '../../forms/components/antd/GraphqlSchemaFormModal';
import React from 'react';
import { graphql } from '../../../@generated';
import { useFilteredEbkphCategories } from '../hooks/useFilteredEbkphCategories';
import { useGraphqlSchemaFormModal } from '../../forms/hooks/useGraphqlSchemaFormModal';
import { usePrismaManyTable } from '../../table/hooks/usePrismaManyTable';
import { useTranslation } from 'next-i18next';

export const EbkphCategoriesTableQuery = graphql(/* GraphQL */ `
  query ebkphCategoriesTable(
    $where: EbkphCategoryWhereInput
    $orderBy: [EbkphCategoryOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    ebkphCategories(
      where: $where
      orderBy: $orderBy
      take: $take
      skip: $skip
    ) {
      ...EbkphCategory
    }
    ebkphCategoriesCount(where: $where)
  }
`);

const useEbkphCategoryColumns = (props: {
  refresh: () => void;
  ebkphCategoriesQuery?: EbkphCategoriesTableQueryType;
}) => {
  const { t } = useTranslation();
  const data = props.ebkphCategoriesQuery?.ebkphCategories;

  const [open, formModalProps] = useGraphqlSchemaFormModal({
    ...EbkphCategoryUpdateResource,
    onClose: props.refresh,
  });

  const columns: TableColumnType<{
    id: string;
    name: string;
    parentId: EbkphCategory;
  }>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: true,
    },
    {
      title: 'Parent',
      dataIndex: 'parent',
      key: 'parent',
      sorter: false,
      render: (_, { parentId }) => parentId?.name,
    },
    {
      title: t('common:common.actions'),
      key: 'action',
      render: (_, { id }) => (
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Space size="middle">
            <Button
              icon={<EditOutlined />}
              onClick={() => open({ where: { id } }, false)}
            />
          </Space>
        </div>
      ),
    },
  ];

  return { columns, data, formModalProps };
};

export type EbkphCategoryTableProps = {};

export const EbkphCategoryTable: React.FC<EbkphCategoryTableProps> = () => {
  const tableOptions = usePrismaManyTable(
    EbkphCategoriesTableQuery,
    (data) => data.ebkphCategoriesCount,
    {
      take: 100,
      orderBy: [{ name: SortOrder.Asc }],
    },
  );

  const { filterConfig, filter, setFilter } = useFilteredEbkphCategories({
    setWhere: tableOptions.setWhere,
  });

  const {
    columns,
    data,
    formModalProps: formModalPropsUpdate,
  } = useEbkphCategoryColumns({
    refresh: tableOptions.queryResult.refetch,
    ebkphCategoriesQuery: tableOptions.queryResult.data,
  });

  const [createOne, formModalPropsCreate] = useGraphqlSchemaFormModal({
    ...EbkphCategoryCreateResource,
    onClose: () => {
      tableOptions.queryResult.refetch();
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
        <Button
          icon={<PlusOutlined />}
          onClick={() => createOne(undefined, true)}
        />
      </FilterPanel>
      <Table<any>
        columns={columns}
        dataSource={data || []}
        rowKey="id"
        pagination={tableOptions.pagination}
        onChange={tableOptions.handleTableChange}
      />
      <GraphqlSchemaFormModal
        {...formModalPropsCreate}
        renderForm={({ schemaForm }) => {
          return <EbkphCategoryForm form={schemaForm.form} />;
        }}
      />
      <GraphqlSchemaFormModal
        {...formModalPropsUpdate}
        renderForm={({ schemaForm }) => {
          return <EbkphCategoryForm form={schemaForm.form} />;
        }}
      />
    </div>
  );
};
