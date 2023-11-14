import { property } from '@panter/prisma-inputs';
import {
  PrismaSchemaFromGraphql,
  prismaInputBuilderFromGraphql,
  prismaResource,
} from '@panter/react-forms';
import { graphql } from '../../@generated';
import { getFragment } from '../../lib/getFragment';

export const DeleteOneAutocompleteMutation = graphql(/* GraphQL */ `
  mutation DeleteOneAutocomplete($where: EntityIdInput!) {
    deleteOneAutocomplete(where: $where) {
      id
    }
  }
`);

export const CreateOneAutocompleteMutation = graphql(/* GraphQL */ `
  mutation CreateOneAutocomplete($data: AutocompleteCreateInput!) {
    createOneAutocomplete(data: $data) {
      id
      ...Autocomplete
    }
  }
`);

export const UpdateOneAutocompleteMutation = graphql(/* GraphQL */ `
  mutation UpdateOneAutocomplete(
    $where: EntityIdInput!
    $data: AutocompleteUpdateInput!
  ) {
    updateOneAutocomplete(where: $where, data: $data) {
      id
      ...Autocomplete
    }
  }
`);

export const OneAutocompleteQuery = graphql(/* GraphQL */ `
  query oneAutocomplete($where: EntityIdInput!) {
    autocomplete(where: $where) {
      id
      ...Autocomplete
    }
  }
`);

export const ManyAutocompleteQuery = graphql(/* GraphQL */ `
  query autocompletes(
    $where: AutocompleteWhereInput
    $orderBy: [AutocompleteOrderByInput!]
    $take: Int
    $skip: Int
  ) {
    autocompletes(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      ...Autocomplete
    }

    autocompletesCount(where: $where)
  }
`);

export const AutocompleteFragment = graphql(/* GraphQL */ `
  fragment Autocomplete on Autocomplete {
    id
    key
    value
  }
`);

export const resourceId = 'Autocomplete';

export const autocompleteSchema: PrismaSchemaFromGraphql<
  typeof CreateOneAutocompleteMutation,
  typeof UpdateOneAutocompleteMutation
> = prismaInputBuilderFromGraphql({
  create: CreateOneAutocompleteMutation,
  update: UpdateOneAutocompleteMutation,
})({
  props: {
    key: property(),
    value: property(),
  },
  create: {},
  update: {},
});

if (!autocompleteSchema.updateSchema) {
  throw new Error('Autocomplete updateSchema not defined');
}

if (!autocompleteSchema.createSchema) {
  throw new Error('Autocomplete createSchema not defined');
}

export const AutocompleteCreateResource = prismaResource({
  fragment: AutocompleteFragment,
  resourceId,
  schema: autocompleteSchema.createSchema,
  mutation: CreateOneAutocompleteMutation,
  skipQuery: true,
  queryDataToModel: (data) =>
    getFragment(AutocompleteFragment, data.autocomplete),
  mutationDataToModel: (data) =>
    getFragment(AutocompleteFragment, data.createOneAutocomplete),
});

export const AutocompleteUpdateResource = prismaResource({
  fragment: AutocompleteFragment,
  resourceId,
  schema: autocompleteSchema.updateSchema,
  query: OneAutocompleteQuery,
  mutation: UpdateOneAutocompleteMutation,
  queryDataToModel: (data) =>
    getFragment(AutocompleteFragment, data.autocomplete),
  mutationDataToModel: (data) =>
    getFragment(AutocompleteFragment, data.updateOneAutocomplete),
});
