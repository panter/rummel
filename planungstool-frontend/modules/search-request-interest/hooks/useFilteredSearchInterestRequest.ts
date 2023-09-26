import {
  useMultiSelectFilterProperty,
  useStringFilterProperty,
} from '../../filter/components/SelectFilterItem';

import { lowerCase } from 'lodash';
import { useTranslation } from 'next-i18next';
import { SearchRequestInterestState } from '../../../@generated/graphql';
import { FilterConfig } from '../../filter/components/Filter';
import { useLocalStorageWithPathnameFilter } from '../../filter/hooks/useLocalStorageFilter';
import { ManySearchRequestQuery } from '../../search-request/components/list/SearchRequestsTable';
import { ExtractWhereVariableFromNode } from '../../table/hooks/usePrismaWhereVariable';
import { ManySearchRequestInterestQuery } from '../components/list/SearchRequestInterestsTable';

export type SearchRequestInterestListFilter = {
  project?: string | null;
  buildingComponentName?: string | null;
  category?: string | null;
  ebkphCategory?: string | null;
  state?: string[] | null;
  deadlineFound?: string | null;
  responsibleUser?: string | null;
};

export function useFilteredSearchInterestRequest({
  initialFilter,
  setWhere,
}: {
  initialFilter?: SearchRequestInterestListFilter;
  setWhere: (
    where: ExtractWhereVariableFromNode<typeof ManySearchRequestInterestQuery>,
  ) => void;
}) {
  const { t } = useTranslation();
  const filterConfig: FilterConfig<SearchRequestInterestListFilter> = {
    project: useStringFilterProperty({
      label: t('common:resources.SearchRequestInterest.fields.project'),
    }),
    responsibleUser: useStringFilterProperty({
      label: t('common:resources.SearchRequestInterest.fields.responsibleUser'),
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
    state: useMultiSelectFilterProperty({
      label: t('common:resources.SearchRequestInterest.fields.state'),
      values: Object.keys(SearchRequestInterestState).map((id) => ({
        id: lowerCase(id),
        label: t(`common:enums.SearchRequestInterestState.${id}` as any),
      })),
    }),
    deadlineFound: useStringFilterProperty({
      label: t('common:resources.SearchRequest.fields.deadlineFound'),
    }),
  };

  const filterToInput = (filter: SearchRequestInterestListFilter) => {
    const where: ExtractWhereVariableFromNode<
      typeof ManySearchRequestInterestQuery
    > = {
      searchRequest: {
        project: filter.project
          ? { name: { contains: filter.project } }
          : undefined,
        buildingComponentName: filter.buildingComponentName
          ? { contains: filter.buildingComponentName }
          : undefined,
        category: filter.category
          ? { name: { contains: filter.category } }
          : undefined,
        ebkphCategory: filter.ebkphCategory
          ? { name: { contains: filter.ebkphCategory } }
          : undefined,
        deadlineFound: filter.deadlineFound
          ? { equals: filter.deadlineFound }
          : undefined,
      },
      responsibleUser: filter.responsibleUser
        ? {
            email: {
              contains: filter.responsibleUser,
            },
          }
        : undefined,
    };
    if (
      where.searchRequest &&
      Object.values(where.searchRequest).filter(Boolean).length === 0
    ) {
      delete where.searchRequest;
    }

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
