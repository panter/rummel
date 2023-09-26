import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Space, Table, TableColumnType } from 'antd';
import Link from 'next/link';
import { FragmentType, useFragment } from '../../../@generated';
import {
  AutocompleteFragment as AutocompleteFragmentType,
  SortOrder,
} from '../../../@generated/graphql';
import { Filter } from '../../filter/components/Filter';
import { FilterPanel } from '../../filter/components/FilterComponents';
import { GraphqlSchemaFormModal } from '../../forms/components/antd/GraphqlSchemaFormModal';
import { useGraphqlSchemaFormModal } from '../../forms/hooks/useGraphqlSchemaFormModal';
import { usePrismaManyTable } from '../../table/hooks/usePrismaManyTable';
import { useFilteredAutocomplete } from '../hooks/useFilteredAutocomplete';
import {
  AutocompleteCreateResource,
  AutocompleteFragment,
  AutocompleteUpdateResource,
  ManyAutocompleteQuery,
} from '../resource';
import { AutocompleteForm } from './AutocompleteForm';

const useAutocompleteColumns = (props: {
  refresh: () => void;
  dataFragment?: FragmentType<typeof AutocompleteFragment>[];
}) => {
  const data = useFragment(AutocompleteFragment, props.dataFragment);

  const [open, formModalProps] = useGraphqlSchemaFormModal({
    ...AutocompleteUpdateResource,
    onClose: props.refresh,
  });

  const columns: TableColumnType<AutocompleteFragmentType>[] = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      sorter: true,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      sorter: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, { id }) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => open({ where: { id } }, false)}
          />
        </Space>
      ),
    },
  ];

  return { columns, data, formModalProps };
};

export type AutocompleteTableProps = {};

export const AutocompleteTable: React.FC<AutocompleteTableProps> = () => {
  const tableOptions = usePrismaManyTable(
    ManyAutocompleteQuery,
    (data) => data.autocompletesCount,
    {
      take: 10,
      orderBy: [{ key: SortOrder.Asc }],
    },
  );

  const { filterConfig, filter, setFilter } = useFilteredAutocomplete({
    setWhere: tableOptions.setWhere,
  });

  const {
    columns,
    data,
    formModalProps: formModalPropsUpdate,
  } = useAutocompleteColumns({
    refresh: tableOptions.queryResult.refetch,
    dataFragment: tableOptions.queryResult.data?.autocompletes,
  });

  const [createOne, formModalPropsCreate] = useGraphqlSchemaFormModal({
    ...AutocompleteCreateResource,
    onClose: () => {
      tableOptions.queryResult.refetch();
    },
  });

  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 24 }}
        items={[
          { title: <Link href={'/admin/autocomplete'}>Autocomplete</Link> },
        ]}
      />
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
      <Table<AutocompleteFragmentType>
        columns={columns}
        dataSource={data || []}
        rowKey="id"
        pagination={tableOptions.pagination}
        onChange={tableOptions.handleTableChange}
      />
      <GraphqlSchemaFormModal
        {...formModalPropsUpdate}
        renderForm={({ schemaForm, queryInfo, readOnly }) => {
          return <AutocompleteForm form={schemaForm.form} />;
        }}
      />
      <GraphqlSchemaFormModal
        {...formModalPropsCreate}
        renderForm={({ schemaForm, queryInfo, readOnly }) => {
          return <AutocompleteForm form={schemaForm.form} />;
        }}
      />
    </div>
  );
};
