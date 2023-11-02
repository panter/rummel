import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Table, TableColumnType } from 'antd';
import { usePrismaFormModal } from '@panter/react-forms';
import {
  GraphqlSchemaFormModal,
  useAntPrismaManyQuery,
} from '@panter/react-forms-ant';
import { FragmentType, useFragment } from '../../../@generated';
import {
  AutocompleteFragment as AutocompleteFragmentType,
  SortOrder,
} from '../../../@generated/graphql';
import { Filter } from '../../filter/components/Filter';
import { FilterPanel } from '../../filter/components/FilterComponents';
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

  const [open, formModalProps] = usePrismaFormModal({
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

export type AutocompleteTablePrismaModalProps = {};

export const AutocompleteTablePrismaModal: React.FC<
  AutocompleteTablePrismaModalProps
> = () => {
  const tableOptions = useAntPrismaManyQuery(
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

  const [createOne, formModalPropsCreate] = usePrismaFormModal({
    ...AutocompleteCreateResource,
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
