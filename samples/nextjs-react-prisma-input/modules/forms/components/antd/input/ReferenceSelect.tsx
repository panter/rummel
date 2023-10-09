import {
  OperationVariables,
  TypedDocumentNode,
  useLazyQuery,
  useQuery,
} from '@apollo/client';
import {
  SingleSelectOptGroupOptionsType,
  SingleSelectOptionsType,
  useSelect,
} from '../../../../ui/form/hooks/antd/useSelect';
import { isArray, isNumber, uniqBy } from 'lodash';

import { Select } from 'antd';
import { notNil } from '../../../../ui/core/utils/arrays';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

type ReferenceSelectEntityId = { id: string };

type ReferenceEntitySingleMulti<Multi extends boolean> = Multi extends true
  ? ReferenceSelectEntityId[]
  : ReferenceSelectEntityId;

const Base = styled.div`
  width: 100%;
`;

// TODO: cro generalize this component and name it GraphqlSelector,
// just a small change in onChange of the select

// TODO: on local search we also filter the active value,
// on remote search we keep the active item showing -> align behavior
export type ReferenceSelectorProps<
  Multi extends boolean,
  ManyData,
  ManyVariables extends OperationVariables,
  Result,
> = {
  style?: React.CSSProperties;
  className?: string;
  isMultiple?: Multi;
  mapOptions?: (
    option: SingleSelectOptionsType[],
  ) => SingleSelectOptGroupOptionsType[] | SingleSelectOptionsType[];
  resourceId?: string;
  findManyQuery: TypedDocumentNode<ManyData, ManyVariables>;
  manyResult: (data: ManyData) => Result[] | ReadonlyArray<Result>;
  manyCount?: (data: ManyData) => number;
  disableLocalSearch?: boolean;
  toOption: (data: Result, results: any) => SingleSelectOptionsType | undefined;
  searchToManyVars: (value?: string) => ManyVariables;
  selectedFindVars: (
    value?: ReferenceEntitySingleMulti<Multi> | null,
  ) => ManyVariables | undefined;
  onChange?: (value?: ReferenceEntitySingleMulti<Multi> | null) => void;
  emptySelectionVariables?: ManyVariables;
  defaultVariables?: ManyVariables;
  value?: ReferenceEntitySingleMulti<Multi> | null;
  readOnly?: boolean;
  disabled?: boolean;
};

export function ReferenceSelect<
  Multi extends boolean,
  ManyData,
  ManyVariables extends OperationVariables,
  Result,
>({
  findManyQuery,
  selectedFindVars,
  toOption,
  manyResult,
  manyCount,
  disableLocalSearch,
  searchToManyVars,
  onChange,
  emptySelectionVariables,
  defaultVariables,
  value,
  isMultiple,
  mapOptions: groupBy,
  style,
  className,
  readOnly,
}: ReferenceSelectorProps<Multi, ManyData, ManyVariables, Result>) {
  const { t } = useTranslation();

  const selectedVariables = selectedFindVars(value);
  const { data: selectedResultData, loading: loadingSelected } = useQuery(
    findManyQuery,
    {
      variables: selectedVariables,
      skip: !selectedVariables,
      fetchPolicy: 'cache-and-network',
    },
  );
  const [search, { data: searchResultData, loading: searching }] =
    useLazyQuery(findManyQuery);

  // just load a first batch of data
  useEffect(() => {
    const variables: ManyVariables = {
      ...defaultVariables,
      ...emptySelectionVariables,
    } as any;
    search({ variables });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedRecords = selectedResultData
    ? manyResult(selectedResultData)
    : [];
  const searchResult = searchResultData ? manyResult(searchResultData) : [];
  const totalCount = searchResultData && manyCount?.(searchResultData);
  const optionsRaw = uniqBy(
    [
      ...(selectedRecords?.map((item) => toOption(item, searchResult || [])) ||
        []),
      ...(searchResult?.map((item) => toOption(item, searchResult || [])) ||
        []),
    ],
    'value',
  ).filter(notNil);
  const options = groupBy ? groupBy(optionsRaw) : optionsRaw;

  const filterOption =
    disableLocalSearch ||
    (isNumber(totalCount) && totalCount > searchResult.length)
      ? false
      : undefined;

  const selectProps = useSelect({
    onChange,
    loading: searching || loadingSelected,
    filterOption,
    value,
    options,
    readOnly,
  });
  const doSearch = (q: string) => {
    const variables = { ...defaultVariables, ...searchToManyVars(q) };
    filterOption === false && variables && search({ variables });
  };

  return (
    <Base style={style} className={className}>
      <Select
        {...selectProps}
        mode={isMultiple ? 'multiple' : undefined}
        style={{ width: '100%' }}
        onSearch={doSearch}
        notFoundContent={
          searching ? t('common:common.loadingData') : t('common:common.noData')
        }
        onChange={(id, a) => {
          if (!onChange) {
            return;
          } else if (!id) {
            return onChange(null);
          } else if (isArray(id)) {
            if (id.length === 0) {
              return onChange(null);
            }
            return onChange(id.map((ref) => ({ id: ref })) as any);
          }

          onChange({ id } as any);
        }}
        value={
          isArray(value)
            ? value.map(({ id }) => id)
            : value
            ? {
                value: value.id,
              }
            : undefined
        }
        showArrow={false}
      />
    </Base>
  );
}

export function selectedFindVariables<
  T extends
    | { where: { id: { in: string[] } } }
    | { where: { id: { equals: string } } },
>(
  e?: ReferenceSelectEntityId | ReferenceSelectEntityId[] | null,
): T | undefined {
  if (!e) return undefined;
  if (isArray(e)) {
    return { where: { id: { in: e.map((e) => e.id) } } } as T;
  }

  return { where: { id: { equals: e.id } } } as T;
}

export const groupByParentValue =
  () =>
  (option: SingleSelectOptionsType[]): SingleSelectOptGroupOptionsType[] => {
    const allChildren = option
      .filter(({ parentValue }) => !parentValue)
      .map((parent) => {
        const children = option.filter((o) => parent.value === o.parentValue);
        return {
          ...parent,
          options: children || [],
        };
      });

    return allChildren;
  };
