import {
  ExtractWhereVariableFromNode,
  usePrismaLocalStorageFilter,
} from '@panter/react-forms';
import { FilterConfig } from '../../filter/components/Filter';
import { useStringFilterProperty } from '../../filter/components/SelectFilterItem';
import { ManyAutocompleteQuery } from './useManyAutocompletes';

export type AutocompleteFilterModel = {
  key?: string | null;
  value?: string | null;
};

export function useFilteredAutocomplete({
  initialFilter,
  setWhere,
}: {
  initialFilter?: AutocompleteFilterModel;
  setWhere: (
    where: ExtractWhereVariableFromNode<typeof ManyAutocompleteQuery>,
  ) => void;
}) {
  const keySearchProperty = useStringFilterProperty({
    label: 'Key',
  });

  const valueSearchProperty = useStringFilterProperty({
    label: 'Value',
  });

  const filterConfig: FilterConfig<AutocompleteFilterModel> = {
    key: keySearchProperty,
    value: valueSearchProperty,
  };

  const filterToInput = (filter: AutocompleteFilterModel) => {
    const where: ExtractWhereVariableFromNode<typeof ManyAutocompleteQuery> = {
      key: filter.key ? { contains: filter.key } : undefined,
      value: filter.value ? { contains: filter.value } : undefined,
    };
    return where;
  };
  const [filter, setFilter] = usePrismaLocalStorageFilter({
    storageKey: 'autocomplete',
    defaultWhere: {},
    query: ManyAutocompleteQuery,
    filterToInput,
    initialFilter,
    setWhere,
  });

  return { filterConfig, filter, setFilter };
}
