import { capitalize, lowerCase } from 'lodash';
import {
  useMultiSelectFilterProperty,
  useNumberFilterProperty,
  useSingleSelectFilterProperty,
  useStringFilterProperty,
} from '../../filter/components/SelectFilterItem';

import { useTranslation } from 'next-i18next';
import {
  MaterialsDepotState,
  MaterialsDepotWhereInput,
} from '../../../@generated/graphql';
import { FilterConfig } from '../../filter/components/Filter';
import { useLocalStorageWithPathnameFilter } from '../../filter/hooks/useLocalStorageFilter';
import { ExtractWhereVariableFromNode } from '../../table/hooks/usePrismaWhereVariable';
import { MaterialsDepotListQuery } from '../components/list/MaterialsDepotListContainer';
import { useAutocompleteFilterProperty } from '../../autocomplete/hooks/useAutocompleteFilterProperty';

export type MaterialDepotListFilter = {
  reUseRating?: number | null;
  responsibleUser?: string | null;
  shortName?: string | null;
  name?: string | null;
  typology?: string | null;
  city?: string | null;
  canton?: string | null;
  fulltext?: string | null;
  state?: MaterialsDepotState[] | null;
  phase?: string | null;
};

export function useFilteredMaterialDepots({
  initialFilter,
  setWhere,
}: {
  initialFilter?: MaterialDepotListFilter;
  setWhere: (
    where: ExtractWhereVariableFromNode<typeof MaterialsDepotListQuery>,
  ) => void;
}) {
  const { t } = useTranslation();
  const filterConfig: FilterConfig<MaterialDepotListFilter> = {
    state: useMultiSelectFilterProperty<MaterialsDepotState>({
      label: t('common:common.status'),
      values: Object.keys(MaterialsDepotState).map((id) => ({
        id: lowerCase(id) as MaterialsDepotState,
        label: t(`common:enums.MaterialsDepotState.${capitalize(id)}` as any),
      })),
    }),
    reUseRating: useNumberFilterProperty({
      label: t('common:resources.MaterialsDepot.fields.reUseRating'),
      min: 1,
      max: 5,
    }),
    responsibleUser: useStringFilterProperty({
      label: t('common:resources.MaterialsDepot.fields.responsableUserId'),
    }),
    shortName: useStringFilterProperty({
      label: t('common:resources.MaterialsDepot.fields.shortName'),
    }),
    name: useStringFilterProperty({
      label: t('common:resources.MaterialsDepot.fields.name'),
    }),
    typology: useAutocompleteFilterProperty({
      labelKey: 'materials-depot-typology',
      label: t('common:resources.MaterialsDepot.fields.typology'),
    }),
    city: useStringFilterProperty({
      label: t('common:resources.MaterialsDepot.fields.city'),
    }),
    canton: useStringFilterProperty({
      label: t('common:resources.MaterialsDepot.fields.canton'),
    }),
    fulltext: useStringFilterProperty({
      label: t('common:common.fullTextSearch'),
    }),
    phase: useAutocompleteFilterProperty({
      labelKey: 'materials-depot-phase',
      label: t('common:resources.MaterialsDepot.fields.phase'),
    }),
  };

  const filterToInput = (
    filter?: MaterialDepotListFilter,
  ): MaterialsDepotWhereInput => {
    if (!filter) {
      return {};
    }

    const where: ExtractWhereVariableFromNode<typeof MaterialsDepotListQuery> =
      {
        reUseRating: filter.reUseRating
          ? { equals: filter.reUseRating }
          : undefined,
        responsableUser: filter.responsibleUser
          ? { email: { contains: filter.responsibleUser } }
          : undefined,
        shortName: filter.shortName
          ? { contains: filter.shortName }
          : undefined,
        name: filter.name ? { contains: filter.name } : undefined,
        typology: filter.typology ? { contains: filter.typology } : undefined,
        city: filter.city ? { contains: filter.city } : undefined,
        canton: filter.canton ? { contains: filter.canton } : undefined,
        materialDepotFulltextSearch: filter.fulltext
          ? { fulltext: filter.fulltext }
          : undefined,
        phase: filter.phase ? { contains: filter.phase } : undefined,
      };
    if (filter.state?.length) {
      where.state = {
        in: filter.state.map((state) => lowerCase(state)),
      };
    } else {
      filter.state = undefined;
    }
    return where;
  };
  const [filter, setFilter] = useLocalStorageWithPathnameFilter({
    defaultWhere: {},
    query: MaterialsDepotListQuery,
    filterToInput,
    initialFilter,
    setWhere,
  });

  return { filterConfig, filter, setFilter };
}
