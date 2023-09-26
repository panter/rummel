import {
  PrismaSchemaFromGraphql,
  prismaInputBuilderFromGraphql,
} from '../ui/form/utils/prismaInputBuilderFromGraphql';
import { property, reference } from '@panter/prisma-inputs';

import { SortOrder } from '../../@generated/graphql';
import { formReferenceSelectResource } from '../ui/form/hooks/antd/useSelect';
import { prismaResource } from '../ui/form/hooks/usePrismaForms';
import { getFragment } from '../../lib/getFragment';
import { graphql } from '../../@generated';
import { selectedFindVariables } from '../forms/components/antd/input/ReferenceSelect';
import { sortBy } from 'lodash';

export const CreateOneCategoryMutation = graphql(/* GraphQL */ `
  mutation CreateOneCategory($data: CategoryCreateInput!) {
    createOneCategory(data: $data) {
      id
      ...Category
    }
  }
`);

export const UpdateOneCategoryMutation = graphql(/* GraphQL */ `
  mutation UpdateOneCategory(
    $where: EntityIdInput!
    $data: CategoryUpdateInput!
  ) {
    updateOneCategory(where: $where, data: $data) {
      id
      ...Category
    }
  }
`);

export const OneCategoryQuery = graphql(/* GraphQL */ `
  query OneCategory($where: EntityIdInput!) {
    category(where: $where) {
      id
      ...Category
    }
  }
`);

export const CategoryFragment = graphql(/* GraphQL */ `
  fragment Category on Category {
    id
    name
    sortOrder
    description
    parent {
      id
    }
  }
`);

export const CategoryReferenceSelectorFragment = graphql(/* GraphQL */ `
  fragment CategoryReferenceSelector on Category {
    id
    name
    parent {
      id
      name
    }
  }
`);

export const CategoryReferenceQuery = graphql(/* GraphQL */ `
  query categoriesReference(
    $where: CategoryWhereInput
    $orderBy: [CategoryOrderByInput!]
  ) {
    categories(where: $where, orderBy: $orderBy) {
      id
      ...CategoryReferenceSelector
    }
    categoriesCount
  }
`);

export const ManyCategoryQuery = graphql(/* GraphQL */ `
  query categories(
    $where: CategoryWhereInput
    $orderBy: [CategoryOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    categories(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      name
    }
    categoriesCount(where: $where)
  }
`);

const resourceId = 'Category';

export const categorySchema: PrismaSchemaFromGraphql<
  typeof CreateOneCategoryMutation,
  typeof UpdateOneCategoryMutation
> = prismaInputBuilderFromGraphql({
  create: CreateOneCategoryMutation,
  update: UpdateOneCategoryMutation,
})(() => ({
  props: {
    name: property(),
    description: property(),
    sortOrder: property(),
    parent: reference(),
    parentId: reference(),
  },
  create: {},
  update: {},
}));

export const CategoryReferenceSelect = formReferenceSelectResource({
  resourceId,
  findManyQuery: CategoryReferenceQuery,
  mapOptions: (options) => sortBy(options, 'sortOrder'),
  defaultVariables: {
    orderBy: { sortOrder: SortOrder.Asc },
  },
  selectedFindVars: selectedFindVariables,
  manyResult: (e) =>
    getFragment(CategoryReferenceSelectorFragment, e.categories),
  manyCount: (e) => e.categoriesCount,
  searchToManyVars: (contains) => ({
    where: { name: { contains } },
  }),
  toOption: (e) => {
    return e
      ? {
          value: e.id,
          label: e.name,
          keys: [e.id],
        }
      : undefined;
  },
});

if (!categorySchema.updateSchema) {
  throw new Error('Autocomplete updateSchema not defined');
}

if (!categorySchema.createSchema) {
  throw new Error('Autocomplete createSchema not defined');
}

export const CategoryCreateResource = prismaResource({
  resourceId,
  formModelType: 'query',
  fragment: CategoryFragment,
  schema: categorySchema.createSchema,
  query: OneCategoryQuery,
  mutation: CreateOneCategoryMutation,
  skipQuery: true,
  queryDataToModel: (data) => getFragment(CategoryFragment, data.category),
  mutationDataToModel: (data) =>
    getFragment(CategoryFragment, data.createOneCategory),
});

export const CategoryUpdateResource = prismaResource({
  resourceId,
  formModelType: 'query',
  fragment: CategoryFragment,
  schema: categorySchema.updateSchema,
  query: OneCategoryQuery,
  mutation: UpdateOneCategoryMutation,
  skipQuery: true,
  queryDataToModel: (data) => getFragment(CategoryFragment, data.category),
  mutationDataToModel: (data) =>
    getFragment(CategoryFragment, data.updateOneCategory),
});
