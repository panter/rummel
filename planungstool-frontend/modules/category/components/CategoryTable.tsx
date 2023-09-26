import React from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Table, TableColumnType } from 'antd';
import { graphql } from '../../../@generated';
import {
  CategoriesTableQuery as CategoriesTableQueryType,
  SortOrder,
} from '../../../@generated/graphql';
import { usePrismaManyTable } from '../../table/hooks/usePrismaManyTable';
import { FilterPanel } from '../../filter/components/FilterComponents';
import { useTranslation } from 'next-i18next';
import { Filter } from '../../filter/components/Filter';
import { useFilteredCategories } from '../hooks/useFilteredCategories';
import { useGraphqlSchemaFormModal } from '../../forms/hooks/useGraphqlSchemaFormModal';
import { CategoryCreateResource, CategoryUpdateResource } from '../resource';
import { GraphqlSchemaFormModal } from '../../forms/components/antd/GraphqlSchemaFormModal';
import { CategoryForm } from './CategoryForm';

export const CategoriesTableQuery = graphql(/* GraphQL */ `
  query categoriesTable(
    $where: CategoryWhereInput
    $orderBy: [CategoryOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    categories(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      name
      sortOrder
    }
    categoriesCount(where: $where)
  }
`);

const useCategoryColumns = (props: {
  refresh: () => void;
  categoriesQuery?: CategoriesTableQueryType;
}) => {
  const { t } = useTranslation();
  const data = props.categoriesQuery?.categories;

  const [open, formModalProps] = useGraphqlSchemaFormModal({
    ...CategoryUpdateResource,
    onClose: props.refresh,
  });

  const columns: TableColumnType<{
    id: string;
    name: string;
  }>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Sortierung',
      dataIndex: 'sortOrder',
      key: 'sortOrder',
      sorter: true,
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

export type CategoryTableProps = {};

export const CategoryTable: React.FC<CategoryTableProps> = () => {
  const tableOptions = usePrismaManyTable(
    CategoriesTableQuery,
    (data) => data.categoriesCount,
    {
      take: 100,
      orderBy: [{ sortOrder: SortOrder.Asc }],
    },
  );

  const { filterConfig, filter, setFilter } = useFilteredCategories({
    setWhere: tableOptions.setWhere,
  });

  const {
    columns,
    data,
    formModalProps: formModalPropsUpdate,
  } = useCategoryColumns({
    refresh: tableOptions.queryResult.refetch,
    categoriesQuery: tableOptions.queryResult.data,
  });

  const [createOne, formModalPropsCreate] = useGraphqlSchemaFormModal({
    ...CategoryCreateResource,
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
          return <CategoryForm form={schemaForm.form} />;
        }}
      />
      <GraphqlSchemaFormModal
        {...formModalPropsUpdate}
        renderForm={({ schemaForm }) => {
          return <CategoryForm form={schemaForm.form} />;
        }}
      />
    </div>
  );
};
