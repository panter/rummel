import { useAntPrismaManyQuery } from '@panter/react-forms-ant';
import { graphql } from '../../../@generated';
import { SortOrder } from '../../../@generated/graphql';
import { useFilteredAutocomplete } from './useFilteredAutocomplete';

export const ManyAutocompleteQuery = graphql(/* GraphQL */ `
  query autocompletes(
    $where: AutocompleteWhereInput
    $orderBy: [AutocompleteOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    autocompletes(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      ...Autocomplete
    }

    autocompletesCount(where: $where)
  }
`);

export const useManyAutocompletes = () => {
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

  return { filterConfig, filter, setFilter, tableOptions };
};
