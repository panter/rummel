import {
  useMultiSelectFilterProperty,
  useStringFilterProperty,
} from '../../filter/components/SelectFilterItem';

import { lowerCase } from 'lodash';
import { useTranslation } from 'next-i18next';
import { SearchRequestState } from '../../../@generated/graphql';
import { FilterConfig } from '../../filter/components/Filter';
import { useLocalStorageWithPathnameFilter } from '../../filter/hooks/useLocalStorageFilter';
import { ExtractWhereVariableFromNode } from '../../table/hooks/usePrismaWhereVariable';
import { ManySearchRequestQuery } from '../components/list/SearchRequestsTable';
import dayjs from 'dayjs';
import { dateFormat } from '../../../utils/date';

export type SearchRequestListFilter = {
  project?: string | null;
  buildingComponentName?: string | null;
  category?: string | null;
  ebkphCategory?: string | null;
  deadlineFound?: string | null;
  responsibleUser?: string | null;
  state?: SearchRequestState[] | null;
};

export function useFilteredSearchRequest({
  initialFilter,
  setWhere,
}: {
  initialFilter?: SearchRequestListFilter;
  setWhere: (
    where: ExtractWhereVariableFromNode<typeof ManySearchRequestQuery>,
  ) => void;
}) {
  const { t } = useTranslation();
  const filterConfig: FilterConfig<SearchRequestListFilter> = {
    project: useStringFilterProperty({
      label: t('common:resources.SearchRequest.fields.projectId'),
    }),
    buildingComponentName: useStringFilterProperty({
      label: t('common:resources.SearchRequest.fields.buildingComponentName'),
    }),
    category: useStringFilterProperty({
      label: t('common:resources.SearchRequest.fields.categoryId'),
    }),
    ebkphCategory: useStringFilterProperty({
      label: t('common:resources.SearchRequest.fields.ebkphCategoryId'),
    }),
    state: useMultiSelectFilterProperty<SearchRequestState>({
      label: t('common:common.status'),
      values: Object.keys(SearchRequestState).map((id) => ({
        id: lowerCase(id) as SearchRequestState,
        label: t(`common:enums.SearchRequestState.${id}` as any),
      })),
    }),
    responsibleUser: useStringFilterProperty({
      label: t('common:resources.SearchRequest.fields.responsibleUserId'),
    }),
    deadlineFound: useStringFilterProperty({
      label: t('common:resources.SearchRequest.fields.deadlineFound'),
    }),
  };

  const filterToInput = (filter: SearchRequestListFilter) => {
    const where: ExtractWhereVariableFromNode<typeof ManySearchRequestQuery> = {
      project: filter.project
        ? { name: { contains: filter.project } }
        : undefined,
      buildingComponentName: filter.buildingComponentName
        ? {
            contains: filter.buildingComponentName,
          }
        : undefined,
      category: filter.category
        ? {
            name: {
              contains: filter.category,
            },
          }
        : undefined,
      ebkphCategory: filter.ebkphCategory
        ? {
            name: {
              contains: filter.ebkphCategory,
            },
          }
        : undefined,
      responsibleUser: filter.responsibleUser
        ? {
            email: {
              contains: filter.responsibleUser,
            },
          }
        : undefined,
      deadlineFound: filter.deadlineFound
        ? {
            lte: dayjs(filter.deadlineFound, dateFormat).format('YYYY-MM-DD'),
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
    return where;
  };
  const [filter, setFilter] = useLocalStorageWithPathnameFilter({
    defaultWhere: {},
    query: ManySearchRequestQuery,
    filterToInput,
    initialFilter,
    setWhere,
  });

  return { filterConfig, filter, setFilter };
}
