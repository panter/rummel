import { PlusOutlined } from '@ant-design/icons';
import {
  UseFormMutationReturn,
  useGraphqlFormModal,
} from '@panter/react-forms';
import { GraphqlFormModal } from '@panter/react-forms-ant';
import { Button, Table } from 'antd';
import {
  AutocompleteFragment as AutocompleteFragmentType,
  CreateOneAutocompleteMutationVariables,
  UpdateOneAutocompleteMutationVariables,
} from '../../../@generated/graphql';
import { getFragment } from '../../../lib/getFragment';
import { Filter } from '../../filter/components/Filter';
import { FilterPanel } from '../../filter/components/FilterComponents';
import { useAutocompleteColumns } from '../hooks/useAutocompleteColumns';
import { useManyAutocompletes } from '../hooks/useManyAutocompletes';
import {
  AutocompleteFragment,
  CreateOneAutocompleteMutation,
  OneAutocompleteQuery,
  UpdateOneAutocompleteMutation,
} from '../resource';

export type AutocompleteTablePrismaModalProps = object;

export const AutocompleteTableGraphqlModal: React.FC<
  AutocompleteTablePrismaModalProps
> = () => {
  const { filterConfig, filter, setFilter, tableOptions } =
    useManyAutocompletes();

  const [open, formModalPropsUpdate] = useGraphqlFormModal({
    query: OneAutocompleteQuery,
    mutation: UpdateOneAutocompleteMutation,
    defaultValues: {} as Partial<AutocompleteFragmentType>,
    modelToInput: (formModel, queryData) => {
      const id = queryData?.autocomplete?.id;
      const autocompleteQueryData = getFragment(
        AutocompleteFragment,
        queryData?.autocomplete,
      );
      if (!autocompleteQueryData || !id) {
        return;
      }

      const data: UpdateOneAutocompleteMutationVariables['data'] = {};
      if (formModel.key != autocompleteQueryData?.key) {
        data.key = { set: formModel.key };
      }

      if (formModel.value != autocompleteQueryData.value) {
        data.value = { set: formModel.value };
      }
      return { where: { id: id }, data };
    },
    mutationDataToModel: (mutationResult) => {
      const data = getFragment(
        AutocompleteFragment,
        mutationResult.updateOneAutocomplete,
      );
      return data;
    },
    onClose: () => tableOptions.queryResult.refetch(),
  });

  const [createOne, formModalPropsCreate] = useGraphqlFormModal({
    mutation: CreateOneAutocompleteMutation,
    defaultValues: {} as Partial<AutocompleteFragmentType>,
    modelToInput: (formModel, _queryData) => {
      const mutationVars: CreateOneAutocompleteMutationVariables = { data: {} };
      if (formModel.key) {
        mutationVars.data.key = formModel.key;
      }

      if (formModel.value) {
        mutationVars.data.value = formModel.value;
      }
      return mutationVars;
    },
    mutationDataToModel: (mutationResult) => {
      const data = getFragment(
        AutocompleteFragment,
        mutationResult.createOneAutocomplete,
      );
      return data;
    },
    onClose: () => tableOptions.queryResult.refetch(),
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
      <GraphqlFormModal
        {...formModalPropsUpdate}
        renderForm={({ schemaForm, queryInfo, readOnly }) => {
          return <AutocompleteForm form={schemaForm.form} />;
        }}
      />
      <GraphqlFormModal
        {...formModalPropsCreate}
        renderForm={({ schemaForm, queryInfo, readOnly }) => {
          return <AutocompleteForm form={schemaForm.form} />;
        }}
      />
    </div>
  );
};

const AutocompleteForm: React.FC<{
  form: UseFormMutationReturn<Partial<AutocompleteFragmentType>>;
}> = ({ form }) => {
  return (
    <div>
      <input {...form.register('key')} />
      <input {...form.register('value', { required: true })} />
    </div>
  );
};
