import { FilterConfig } from '../../filter/components/Filter';
import { useStringFilterProperty } from '../../filter/components/SelectFilterItem';
import { useFilter } from '../../filter/hooks/useFilter';
import { useLocalStorageWithPathnameFilter } from '../../filter/hooks/useLocalStorageFilter';
import { ExtractWhereVariableFromNode } from '../../table/hooks/usePrismaWhereVariable';
import { ManyEbkphCategoryQuery } from '../resource';

export type EbkphCategoryFilterModel = {
  name?: string | null;
};

export function useFilteredEbkphCategories({
  initialFilter,
  setWhere,
}: {
  initialFilter?: EbkphCategoryFilterModel;
  setWhere: (
    where: ExtractWhereVariableFromNode<typeof ManyEbkphCategoryQuery>,
  ) => void;
}) {
  const nameSearchProperty = useStringFilterProperty({
    label: 'Name',
  });

  const filterConfig: FilterConfig<EbkphCategoryFilterModel> = {
    name: nameSearchProperty,
  };

  const filterToInput = (filter: EbkphCategoryFilterModel) => {
    const where: ExtractWhereVariableFromNode<typeof ManyEbkphCategoryQuery> = {
      name: filter.name ? { contains: filter.name } : undefined,
    };
    return where;
  };
  const [filter, setFilter] = useLocalStorageWithPathnameFilter({
    defaultWhere: {},
    query: ManyEbkphCategoryQuery,
    filterToInput,
    initialFilter,
    setWhere,
  });

  return { filterConfig, filter, setFilter };
}
