import { FilterConfig } from '../../filter/components/Filter';
import { useStringFilterProperty } from '../../filter/components/SelectFilterItem';
import { useFilter } from '../../filter/hooks/useFilter';
import { useLocalStorageWithPathnameFilter } from '../../filter/hooks/useLocalStorageFilter';
import { ExtractWhereVariableFromNode } from '../../table/hooks/usePrismaWhereVariable';
import { ManyCategoryQuery } from '../resource';

export type CategoryFilterModel = {
  name?: string | null;
};

export function useFilteredCategories({
  initialFilter,
  setWhere,
}: {
  initialFilter?: CategoryFilterModel;
  setWhere: (
    where: ExtractWhereVariableFromNode<typeof ManyCategoryQuery>,
  ) => void;
}) {
  const nameSearchProperty = useStringFilterProperty({
    label: 'Name',
  });

  const filterConfig: FilterConfig<CategoryFilterModel> = {
    name: nameSearchProperty,
  };

  const filterToInput = (filter: CategoryFilterModel) => {
    const where: ExtractWhereVariableFromNode<typeof ManyCategoryQuery> = {
      name: filter.name ? { contains: filter.name } : undefined,
    };
    return where;
  };
  const [filter, setFilter] = useLocalStorageWithPathnameFilter({
    defaultWhere: {},
    query: ManyCategoryQuery,
    filterToInput,
    initialFilter,
    setWhere,
  });

  return { filterConfig, filter, setFilter };
}
