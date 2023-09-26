import { property, reference } from '@panter/prisma-inputs';
import { sortBy } from 'lodash';
import { graphql } from '../../@generated';
import { SortOrder } from '../../@generated/graphql';
import { getFragment } from '../../lib/getFragment';
import { selectedFindVariables } from '../forms/components/antd/input/ReferenceSelect';
import { formReferenceSelectResource } from '../ui/form/hooks/antd/useSelect';
import { prismaResource } from '../ui/form/hooks/usePrismaForms';
import {
  PrismaSchemaFromGraphql,
  prismaInputBuilderFromGraphql,
} from '../ui/form/utils/prismaInputBuilderFromGraphql';

export const CreateOneSearchRequestInterestMutation = graphql(/* GraphQL */ `
  mutation CreateOneSearchRequestInterest(
    $data: SearchRequestInterestCreateInput!
  ) {
    createOneSearchRequestInterest(data: $data) {
      id
      state
      ...SearchRequestInterest
    }
  }
`);

export const UpdateOneSearchRequestInterestMutation = graphql(/* GraphQL */ `
  mutation UpdateOneSearchRequestInterest(
    $where: EntityIdInput!
    $data: SearchRequestInterestUpdateInput!
  ) {
    updateOneSearchRequestInterest(where: $where, data: $data) {
      id
      state
      ...SearchRequestInterest
    }
  }
`);

export const OneSearchRequestInterestQuery = graphql(/* GraphQL */ `
  query oneSearchRequestInterest($where: EntityIdInput!) {
    searchRequestInterest(where: $where) {
      id
      state
      searchRequest {
        id
        project {
          id
          shortName
        }
      }
      ...SearchRequestInterest
    }
  }
`);

export const CreateSearchRequestInterestDefaultsQuery = graphql(/* GraphQL */ `
  query SearchRequestInterestDefaults {
    me {
      id
    }
  }
`);

export const RejectOneSearchRequestInterestMutation = graphql(/* GraphQL */ `
  mutation RejectOneSearchRequestInterest(
    $input: RejectSearchRequestInterestInput!
  ) {
    rejectSearchRequestInterest(input: $input) {
      id
      ...SearchRequestInterest
    }
  }
`);

export const AcceptOneSearchRequestInterestMutation = graphql(/* GraphQL */ `
  mutation AcceptOneSearchRequestInterest(
    $input: AcceptSearchRequestInterestInput!
  ) {
    acceptSearchRequestInterest(input: $input) {
      id
      ...SearchRequestInterest
    }
  }
`);

export const DeleteOneSearchRequestInterestMutation = graphql(/* GraphQL */ `
  mutation DeleteOneSearchRequestInterest($where: EntityIdInput!) {
    deleteOneSearchRequestInterest(where: $where) {
      id
      ...SearchRequestInterest
    }
  }
`);

export const SearchRequestInterestFragment = graphql(/* GraphQL */ `
  fragment SearchRequestInterest on SearchRequestInterest {
    id
    responsibleUser {
      id
    }
    searchRequest {
      id
    }
    buildingComponent {
      id
    }
    state
    rejectedAt
    rejectionReason
    notes
  }
`);

export const SearchRequestInterestReferenceSelectorFragment =
  graphql(/* GraphQL */ `
    fragment SearchRequestInterestReferenceSelector on SearchRequestInterest {
      id
      state
    }
  `);

export const SearchRequestInterestReferenceQuery = graphql(/* GraphQL */ `
  query searchRequestInterestReference(
    $where: SearchRequestInterestWhereInput
    $orderBy: [SearchRequestInterestOrderByInput!]
  ) {
    searchRequestInterests(where: $where, orderBy: $orderBy) {
      id
      ...SearchRequestInterestReferenceSelector
    }
    searchRequestInterestsCount
  }
`);

const resourceId = 'SearchRequestInterest';

export const SearchRequestInterestReferenceSelect = formReferenceSelectResource(
  {
    resourceId,
    findManyQuery: SearchRequestInterestReferenceQuery,
    mapOptions: (options) => sortBy(options, 'label'),
    defaultVariables: {
      orderBy: { state: SortOrder.Asc },
    },
    selectedFindVars: selectedFindVariables,
    manyResult: (e) =>
      getFragment(
        SearchRequestInterestReferenceSelectorFragment,
        e.searchRequestInterests,
      ),
    manyCount: (e) => e.searchRequestInterestsCount,
    searchToManyVars: (contains) => ({
      where: { state: { contains } },
    }),
    toOption: (e) => {
      return e
        ? {
            value: e.id,
            label: e.state,
            keys: [e.id, e.state],
          }
        : undefined;
    },
  },
);

export const searchRequestInterestSchema: PrismaSchemaFromGraphql<
  typeof CreateOneSearchRequestInterestMutation,
  typeof UpdateOneSearchRequestInterestMutation
> = prismaInputBuilderFromGraphql({
  create: CreateOneSearchRequestInterestMutation,
  update: UpdateOneSearchRequestInterestMutation,
})(() => ({
  props: {
    notes: property(),
    responsibleUser: reference(),
    responsibleUserId: reference(),
    searchRequestId: reference(),
    searchRequest: reference(),
    buildingComponentId: reference(),
    buildingComponent: reference(),
    state: property(),
    rejectedAt: property(),
    rejectionReason: property(),
    acceptedAt: property(),
  },
  create: {} as any,
  update: {},
}));

if (!searchRequestInterestSchema.updateSchema) {
  throw new Error('SearchRequestInterest updateSchema not defined');
}

if (!searchRequestInterestSchema.createSchema) {
  throw new Error('SearchRequestInterest createSchema not defined');
}

export const SearchRequestInterestCreateResource = prismaResource({
  resourceId,
  formModelType: 'query',
  fragment: SearchRequestInterestFragment,
  schema: searchRequestInterestSchema.createSchema,
  query: CreateSearchRequestInterestDefaultsQuery,
  mutation: CreateOneSearchRequestInterestMutation,
  queryDataToModel: (data, noDefaults) =>
    !noDefaults && data?.me?.id
      ? {
          responsibleUser: { id: data?.me?.id },
          // responsableUserPM: { id: data?.me?.id },
          // responsableUserSearch: { id: data?.me?.id },
        }
      : undefined,
  mutationDataToModel: (data) =>
    getFragment(
      SearchRequestInterestFragment,
      data.createOneSearchRequestInterest,
    ),
});

export const SearchRequestInterestUpdateResource = prismaResource({
  resourceId,
  formModelType: 'query',
  fragment: SearchRequestInterestFragment,
  schema: searchRequestInterestSchema.updateSchema,
  query: OneSearchRequestInterestQuery,
  mutation: UpdateOneSearchRequestInterestMutation,
  queryDataToModel: (data) =>
    getFragment(SearchRequestInterestFragment, data.searchRequestInterest),
  mutationDataToModel: (data) =>
    getFragment(
      SearchRequestInterestFragment,
      data.updateOneSearchRequestInterest,
    ),
});
