import {
  BuildingComponentPhase,
  BuildingComponentState,
  BuildingComponentWhereInput,
} from '../../../@generated/graphql';
import {
  useMultiSelectFilterProperty,
  useStringFilterProperty,
} from '../../filter/components/SelectFilterItem';

import { BuildingComponentListQuery } from '../components/list/BuildingComponentListContainer';
import { ExtractWhereVariableFromNode } from '../../table/hooks/usePrismaWhereVariable';
import { FilterConfig } from '../../filter/components/Filter';
import { lowerCase } from 'lodash';
import { useFilter } from '../../filter/hooks/useFilter';
import { useTranslation } from 'next-i18next';
import { useLocalStorageWithPathnameFilter } from '../../filter/hooks/useLocalStorageFilter';

export type BuildingComponentListFilter = {
  category?: string | null;
  storageLocation?: string | null;
  state?: BuildingComponentState[] | null;
  phase?: BuildingComponentPhase[] | null;
};

export function useFilteredBuildingComponents({
  initialFilter,
  setWhere,
}: {
  initialFilter?: BuildingComponentListFilter;
  setWhere: (
    where: ExtractWhereVariableFromNode<typeof BuildingComponentListQuery>,
  ) => void;
}) {
  const { t } = useTranslation();
  const filterConfig: FilterConfig<BuildingComponentListFilter> = {
    category: useStringFilterProperty({
      label: t('common:resources.BuildingComponent.fields.categoryId'),
    }),
    storageLocation: useStringFilterProperty({
      label: t(
        'common:resources.BuildingComponent.fields.storageLocationId.id',
      ),
    }),
    state: useMultiSelectFilterProperty<BuildingComponentState>({
      label: t('common:common.status'),
      values: Object.keys(BuildingComponentState).map((key) => ({
        id: lowerCase(key) as BuildingComponentState,
        label: t(`common:enums.BuildingComponentState.${key}` as any),
      })),
    }),
    phase: useMultiSelectFilterProperty<BuildingComponentPhase>({
      label: t('common:resources.BuildingComponent.fields.phase'),
      values: Object.keys(BuildingComponentPhase).map((key) => ({
        id: lowerCase(key) as BuildingComponentPhase,
        label: t(`common:enums.BuildingComponentPhase.${key}` as any),
      })),
    }),
  };

  const filterToInput = (filter: BuildingComponentListFilter) => {
    const where: BuildingComponentWhereInput = {
      category: filter.category
        ? {
            name: {
              contains: filter.category,
            },
          }
        : undefined,
      storageLocation: filter.storageLocation
        ? {
            name: { contains: filter.storageLocation },
          }
        : undefined,
    };
    if (filter.state?.length) {
      where.state = {
        in: filter.state.map((state) => lowerCase(state)),
      };
    } else {
      filter.state = undefined;
    }
    if (filter.phase?.length) {
      where.state = {
        in: filter.phase.map((phase) => lowerCase(phase)),
      };
    } else {
      filter.phase = undefined;
    }
    return where;
  };
  const [filter, setFilter] = useLocalStorageWithPathnameFilter({
    defaultWhere: {},
    query: BuildingComponentListQuery,
    filterToInput,
    initialFilter,
    setWhere,
  });

  return { filterConfig, filter, setFilter };
}
