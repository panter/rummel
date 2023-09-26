import {
  PrismaSchemaFromGraphql,
  prismaInputBuilderFromGraphql,
} from '../ui/form/utils/prismaInputBuilderFromGraphql';
import { Space, Typography } from 'antd';
import { property, reference } from '@panter/prisma-inputs';

import { SortOrder } from '../../@generated/graphql';
import { formReferenceSelectResource } from '../ui/form/hooks/antd/useSelect';
import { prismaResource } from '../ui/form/hooks/usePrismaForms';
import { getFragment } from '../../lib/getFragment';
import { graphql } from '../../@generated';
import { selectedFindVariables } from '../forms/components/antd/input/ReferenceSelect';
import { sortBy } from 'lodash';
import styled from 'styled-components';

export const CreateOneEbkphCategoryMutation = graphql(/* GraphQL */ `
  mutation CreateOneEbkphCategory($data: EbkphCategoryCreateInput!) {
    createOneEbkphCategory(data: $data) {
      id
      ...EbkphCategory
    }
  }
`);

export const UpdateOneEbkphCategoryMutation = graphql(/* GraphQL */ `
  mutation UpdateOneEbkphCategory(
    $where: EntityIdInput!
    $data: EbkphCategoryUpdateInput!
  ) {
    updateOneEbkphCategory(where: $where, data: $data) {
      id
      ...EbkphCategory
    }
  }
`);

export const OneEbkphCategoryQuery = graphql(/* GraphQL */ `
  query OneEbkphCategory($where: EntityIdInput!) {
    ebkphCategory(where: $where) {
      id
      ...EbkphCategory
    }
  }
`);

export const EbkphCategoryReferenceSelectorFragment = graphql(/* GraphQL */ `
  fragment EbkphCategoryReferenceSelector on EbkphCategory {
    id
    name
    description
    parent {
      id
    }
  }
`);

export const EbkphCategoryReferenceQuery = graphql(/* GraphQL */ `
  query ebkphCategoriesReference(
    $where: EbkphCategoryWhereInput
    $orderBy: [EbkphCategoryOrderByInput!]
  ) {
    ebkphCategories(where: $where, orderBy: $orderBy, take: 1000) {
      id
      ...EbkphCategoryReferenceSelector
    }
    ebkphCategoriesCount
  }
`);

export const ManyEbkphCategoryQuery = graphql(/* GraphQL */ `
  query ebkphCategories(
    $where: EbkphCategoryWhereInput
    $orderBy: [EbkphCategoryOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    ebkphCategories(
      where: $where
      orderBy: $orderBy
      take: $take
      skip: $skip
    ) {
      id
      name
    }
    ebkphCategoriesCount(where: $where)
  }
`);

export const EbkphCategoryFragment = graphql(/* GraphQL */ `
  fragment EbkphCategory on EbkphCategory {
    id
    name
    description
    parentId {
      id
      name
    }
  }
`);

export const ebkphCategorySchema: PrismaSchemaFromGraphql<
  typeof CreateOneEbkphCategoryMutation,
  typeof UpdateOneEbkphCategoryMutation
> = prismaInputBuilderFromGraphql({
  create: CreateOneEbkphCategoryMutation,
  update: UpdateOneEbkphCategoryMutation,
})(() => ({
  props: {
    name: property(),
    description: property(),
    parent: reference(),
    parentId: reference(),
  },
  create: {},
  update: {},
}));

if (!ebkphCategorySchema.updateSchema) {
  throw new Error('Autocomplete updateSchema not defined');
}

if (!ebkphCategorySchema.createSchema) {
  throw new Error('Autocomplete createSchema not defined');
}

const resourceId = 'EbkphCategory';

const StyledEbkphCategoryOption = styled(Space)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export interface EbkphCategoryRaw {
  value: string;
  label: any;
  keys: any;
  parentId?: string;
}

export interface EbkphCategoryTree {
  value: string;
  label: any;
  keys: any;
  options?: EbkphCategoryTree[];
}

const getEbkphCategoryDepth = (
  parentId: string,
  options: ReadonlyArray<any>,
): number => {
  let depth = 0;

  const recursiveFindDepth = (_parentId: string) => {
    options.forEach((o) => {
      if (o.id === _parentId) {
        depth += 1;
        o?.parent?.id && recursiveFindDepth(o?.parent?.id);
      }
    });

    return depth;
  };

  return recursiveFindDepth(parentId);
};

export const EbkphCategoryReferenceSelect = formReferenceSelectResource({
  resourceId,
  findManyQuery: EbkphCategoryReferenceQuery,
  mapOptions: (options) => sortBy(options, 'label'),
  defaultVariables: {
    orderBy: { description: SortOrder.Asc },
  },
  selectedFindVars: selectedFindVariables,
  manyResult: (e) =>
    getFragment(EbkphCategoryReferenceSelectorFragment, e.ebkphCategories),
  manyCount: (e) => e.ebkphCategoriesCount,
  searchToManyVars: (contains) => ({
    where: {
      OR: [{ name: { contains } }, { description: { contains } }],
    },
  }),
  toOption: (e, options) => {
    const depth = getEbkphCategoryDepth(e.parent?.id || '', options);

    return e
      ? {
          value: e.id,
          label: (
            <StyledEbkphCategoryOption>
              <Typography.Text
                className="reset-on-input"
                style={{ paddingLeft: depth * 12 }}
              >
                {e.description} {e.name}
              </Typography.Text>
            </StyledEbkphCategoryOption>
          ),
          keys: [e.id, e.name, e.description || ''],
        }
      : undefined;
  },
});

export const EbkphCategoryCreateResource = prismaResource({
  resourceId,
  fragment: EbkphCategoryFragment,
  schema: ebkphCategorySchema.createSchema,
  query: OneEbkphCategoryQuery,
  mutation: CreateOneEbkphCategoryMutation,
  skipQuery: true,
  queryDataToModel: (data) =>
    getFragment(EbkphCategoryFragment, data.ebkphCategory),
  mutationDataToModel: (data) =>
    getFragment(EbkphCategoryFragment, data.createOneEbkphCategory),
});

export const EbkphCategoryUpdateResource = prismaResource({
  resourceId,
  fragment: EbkphCategoryFragment,
  schema: ebkphCategorySchema.updateSchema,
  query: OneEbkphCategoryQuery,
  mutation: UpdateOneEbkphCategoryMutation,
  skipQuery: true,
  queryDataToModel: (data) =>
    getFragment(EbkphCategoryFragment, data.ebkphCategory),
  mutationDataToModel: (data) =>
    getFragment(EbkphCategoryFragment, data.updateOneEbkphCategory),
});
