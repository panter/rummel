import { useTranslation } from 'next-i18next';
import { FilterConfig } from '../../filter/components/Filter';
import { useStringFilterProperty } from '../../filter/components/SelectFilterItem';
import { useLocalStorageWithPathnameFilter } from '../../filter/hooks/useLocalStorageFilter';
import { BuildingComponentListQuery } from '../components/form/MatchingBuildingComponentList';

export type MatchingListFilter = {
  category?: string | null;
};

export function useFilteredMatching({
  initialFilter,
}: {
  initialFilter?: MatchingListFilter;
}) {
  const { t } = useTranslation();
  const filterConfig: FilterConfig<MatchingListFilter> = {
    category: useStringFilterProperty({
      label: t('common:resources.SearchRequest.fields.categoryId'),
    }),
  };

  const filterToInput: any = (filter: MatchingListFilter) => {
    const where = filter.category
      ? {
          category: {
            name: {
              contains: filter.category,
            },
          },
        }
      : undefined;

    return where;
  };

  const [filter, setFilter] = useLocalStorageWithPathnameFilter({
    defaultWhere: {},
    query: BuildingComponentListQuery,
    filterToInput,
    initialFilter,
    setWhere: () => undefined,
  });

  return {
    filterConfig,
    filter,
    setFilter,
    variables: filterToInput(filter),
  };
}
