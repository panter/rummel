import { useTranslation } from 'next-i18next';
import { FilterConfig } from '../../filter/components/Filter';
import { useStringFilterProperty } from '../../filter/components/SelectFilterItem';
import { useLocalStorageWithPathnameFilter } from '../../filter/hooks/useLocalStorageFilter';
import { ExtractWhereVariableFromNode } from '../../table/hooks/usePrismaWhereVariable';
import { StorageLocationListQuery } from '../components/list/StorageLocationListContainer';

export type MaterialDepotListFilter = {
  city?: string | null;
  canton?: string | null;
};

export function useFilteredStorageLocations({
  initialFilter,
  setWhere,
}: {
  initialFilter?: MaterialDepotListFilter;
  setWhere: (
    where: ExtractWhereVariableFromNode<typeof StorageLocationListQuery>,
  ) => void;
}) {
  const { t } = useTranslation();
  const filterConfig: FilterConfig<MaterialDepotListFilter> = {
    city: useStringFilterProperty({
      label: t('common:resources.StorageLocation.fields.city'),
    }),
    canton: useStringFilterProperty({
      label: t('common:resources.StorageLocation.fields.canton'),
    }),
  };

  const filterToInput = (filter: MaterialDepotListFilter) => {
    const where: ExtractWhereVariableFromNode<typeof StorageLocationListQuery> =
      {
        city: filter.city ? { contains: filter.city } : undefined,
        canton: filter.canton ? { contains: filter.canton } : undefined,
      };
    return where;
  };
  const [filter, setFilter] = useLocalStorageWithPathnameFilter({
    defaultWhere: {},
    query: StorageLocationListQuery,
    filterToInput,
    initialFilter,
    setWhere,
  });

  return { filterConfig, filter, setFilter };
}
