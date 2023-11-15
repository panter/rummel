import { PlusOutlined } from '@ant-design/icons';
import { ExtractUseFormReturn, usePrismaFormModal } from '@panter/react-forms';
import { PrismaFormModal } from '@panter/react-forms-ant';
import { Button, Table } from 'antd';
import { AutocompleteFragment as AutocompleteFragmentType } from '../../../@generated/graphql';
import { Filter } from '../../filter/components/Filter';
import { FilterPanel } from '../../filter/components/FilterComponents';
import { useAutocompleteColumns } from '../hooks/useAutocompleteColumns';
import { useManyAutocompletes } from '../hooks/useManyAutocompletes';
import {
  AutocompleteCreateResource,
  AutocompleteUpdateResource,
} from '../resource';

export type AutocompleteTablePrismaModalProps = Record<string, any>;

export const AutocompleteTablePrismaModal: React.FC<
  AutocompleteTablePrismaModalProps
> = () => {
  const { filterConfig, filter, setFilter, tableOptions } =
    useManyAutocompletes();

  const [open, formModalPropsUpdate] = usePrismaFormModal({
    ...AutocompleteUpdateResource,
    onClose: () => tableOptions.queryResult.refetch(),
  });

  const [createOne, formModalPropsCreate] = usePrismaFormModal({
    ...AutocompleteCreateResource,
    onClose: () => {
      tableOptions.queryResult.refetch();
    },
  });

  const { columns, data } = useAutocompleteColumns({
    refresh: tableOptions.queryResult.refetch,
    dataFragment: tableOptions.queryResult.data?.autocompletes,
    onEdit: (d) => open({ where: { id: d.id } }),
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
      <PrismaFormModal
        {...formModalPropsUpdate}
        renderForm={({ schemaForm, queryInfo, readOnly }) => {
          return <AutocompleteForm form={schemaForm.form} />;
        }}
      />
      <PrismaFormModal
        {...formModalPropsCreate}
        renderForm={({ schemaForm, queryInfo, readOnly }) => {
          return <AutocompleteForm form={schemaForm.form} />;
        }}
      />
    </div>
  );
};

export const AutocompleteForm: React.FC<{
  form: ExtractUseFormReturn<
    typeof AutocompleteCreateResource,
    typeof AutocompleteUpdateResource
  >;
}> = ({ form }) => {
  return (
    <div>
      <input {...form.register('key')} />
      <input {...form.register('value', { required: true })} />
    </div>
  );
};
