import { capitalize, lowerCase } from 'lodash';
import {
  useMultiSelectFilterProperty,
  useStringFilterProperty,
} from '../../filter/components/SelectFilterItem';

import { useTranslation } from 'next-i18next';
import { ProjectPhase, ProjectState } from '../../../@generated/graphql';
import { FilterConfig } from '../../filter/components/Filter';
import { useLocalStorageWithPathnameFilter } from '../../filter/hooks/useLocalStorageFilter';
import { ExtractWhereVariableFromNode } from '../../table/hooks/usePrismaWhereVariable';
import { ManyProjectQuery } from '../components/list/ProjectsTable';

export type ProjectListFilter = {
  responsableUserPM?: string | null;
  responsableUserSearch?: string | null;
  name?: string | null;
  state?: ProjectState[] | null;
  phase?: ProjectPhase[] | null;
};

export function useFilteredProject({
  initialFilter,
  setWhere,
}: {
  initialFilter?: ProjectListFilter;
  setWhere: (
    where: ExtractWhereVariableFromNode<typeof ManyProjectQuery>,
  ) => void;
}) {
  const { t } = useTranslation();
  const filterConfig: FilterConfig<ProjectListFilter> = {
    name: useStringFilterProperty({
      label: t('common:resources.Project.fields.name'),
    }),
    responsableUserPM: useStringFilterProperty({
      label: t('common:resources.Project.fields.responsableUserPM'),
    }),
    responsableUserSearch: useStringFilterProperty({
      label: t('common:resources.Project.fields.responsableUserSearch'),
    }),
    state: useMultiSelectFilterProperty<ProjectState>({
      label: t('common:common.status'),
      values: Object.keys(ProjectState).map((id) => ({
        id: lowerCase(id) as ProjectState,
        label: t(`common:enums.ProjectState.${capitalize(id)}` as any),
      })),
    }),
    phase: useMultiSelectFilterProperty<ProjectPhase>({
      label: t('common:resources.Project.fields.phase'),
      values: Object.keys(ProjectPhase).map((id) => ({
        id: lowerCase(id) as ProjectPhase,
        label: t(`common:enums.ProjectPhase.${capitalize(id)}` as any),
      })),
    }),
  };

  const filterToInput = (filter: ProjectListFilter) => {
    const where: ExtractWhereVariableFromNode<typeof ManyProjectQuery> = {
      name: filter.name ? { contains: filter.name } : undefined,
      responsableUserPM: filter.responsableUserPM
        ? {
            email: {
              contains: filter.responsableUserPM,
            },
          }
        : undefined,
      responsableUserSearch: filter.responsableUserSearch
        ? {
            email: {
              contains: filter.responsableUserSearch,
            },
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
      where.phase = {
        in: filter.phase.map((phase) => lowerCase(phase)),
      };
    } else {
      filter.phase = undefined;
    }
    return where;
  };
  const [filter, setFilter] = useLocalStorageWithPathnameFilter({
    defaultWhere: {},
    query: ManyProjectQuery,
    filterToInput,
    initialFilter,
    setWhere,
  });

  return { filterConfig, filter, setFilter };
}
