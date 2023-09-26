import {
  InferSchema,
  manyReference,
  manyRelation,
  prismaSchemaBuilder,
  property,
  reference,
} from '@panter/prisma-inputs';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { sortBy } from 'lodash';
import { graphql } from '../../@generated';
import {
  SearchRequestAssetReferenceCreateWithoutSearchRequestInput,
  SearchRequestAssetReferenceUpdateInput,
  SortOrder,
} from '../../@generated/graphql';
import { getFragment } from '../../lib/getFragment';
import { dateFormat } from '../../utils/date';
import { dimensionRangeSchema } from '../dimension-range/resource';
import { selectedFindVariables } from '../forms/components/antd/input/ReferenceSelect';
import { notNil } from '../ui/core/utils/arrays';
import { formReferenceSelectResource } from '../ui/form/hooks/antd/useSelect';
import { prismaResource } from '../ui/form/hooks/usePrismaForms';
import {
  PrismaSchemaFromGraphql,
  prismaInputBuilderFromGraphql,
} from '../ui/form/utils/prismaInputBuilderFromGraphql';

const { Text } = Typography;

export const CreateOneSearchRequestMutation = graphql(/* GraphQL */ `
  mutation CreateOneSearchRequest($data: SearchRequestCreateInput!) {
    createOneSearchRequest(data: $data) {
      id
      project {
        id
        shortName
      }
      ...SearchRequest
    }
  }
`);

export const UpdateOneSearchRequestMutation = graphql(/* GraphQL */ `
  mutation UpdateOneSearchRequest(
    $where: EntityIdInput!
    $data: SearchRequestUpdateInput!
  ) {
    updateOneSearchRequest(where: $where, data: $data) {
      id
      project {
        id
        shortName
      }
      ...SearchRequest
    }
  }
`);

export const OneSearchRequestQuery = graphql(/* GraphQL */ `
  query oneSearchRequest($where: EntityIdInput!) {
    searchRequest(where: $where) {
      id
      project {
        id
        shortName
      }
      ...SearchRequest
    }
  }
`);

export const CreateSearchRequestDefaultsQuery = graphql(/* GraphQL */ `
  query searchRequestDefaults($projectId: String!) {
    me {
      id
    }
    project(where: { id: $projectId }) {
      id
      shortName
    }
  }
`);

export const SearchRequestFragment = graphql(/* GraphQL */ `
  fragment SearchRequest on SearchRequest {
    id
    state
    buildingComponentName
    buildingComponentDescription
    quantity
    quantityUnit
    deadlineFound
    deadlineShipment
    comments
    budgetInRappens
    budgetNotes
    searchConceptNotes
    huntingStatusNotes
    fireProtectionNotes
    soundProofNotes
    securityNotes
    fallbackLevel
    fallbackLevelCO2PerUnit
    fallbackLevelCO2Total
    createdAt
    projectId {
      id
    }
    responsibleUserId {
      id
    }
    categoryId {
      id
    }
    ebkphCategoryId {
      id
    }
    dimensionRanges {
      id
      minWidth
      maxWidth
      type
      minHeight
      maxHeight
      minDepth
      maxDepth
    }
    assets {
      id
      tags
      createdAt
      updatedAt
      asset {
        id
        url
        mimeType
      }
    }
  }
`);

export const SearchRequestReferenceSelectorFragment = graphql(/* GraphQL */ `
  fragment SearchRequestReferenceSelector on SearchRequest {
    id
    state
    project {
      shortName
      name
    }
    responsibleUser {
      email
    }
    buildingComponentName
    createdAt
  }
`);

export const SearchRequestReferenceQuery = graphql(/* GraphQL */ `
  query searchRequestReference(
    $where: SearchRequestWhereInput
    $orderBy: [SearchRequestOrderByInput!]
  ) {
    searchRequests(where: $where, orderBy: $orderBy) {
      id
      ...SearchRequestReferenceSelector
    }
    searchRequestsCount
  }
`);

const resourceId = 'SearchRequest';

export const SearchRequestReferenceSelect = formReferenceSelectResource({
  resourceId,
  findManyQuery: SearchRequestReferenceQuery,
  mapOptions: (options) => sortBy(options, 'label'),
  defaultVariables: {
    orderBy: { updatedAt: SortOrder.Desc },
  },
  selectedFindVars: selectedFindVariables,
  manyResult: (e) =>
    getFragment(SearchRequestReferenceSelectorFragment, e.searchRequests),
  manyCount: (e) => e.searchRequestsCount,
  searchToManyVars: (contains) => ({
    where: { id: { contains } },
  }),
  toOption: (e) => {
    return e
      ? {
          value: e.id,
          label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>
                {[
                  e.project?.shortName,
                  e.project.name,
                  e.buildingComponentName,
                  e.state,
                ]
                  .filter(notNil)
                  .join(', ')}
              </Text>
              <Text type="secondary" style={{ textAlign: 'end' }}>
                ({dayjs(e.createdAt).format(dateFormat)})
              </Text>
            </div>
          ),
          keys: [
            e.id,
            e.buildingComponentName,
            e.createdAt,
            e.project?.shortName,
            e.project?.name,
          ],
        }
      : undefined;
  },
});

export const searchRequestAssetSchema: InferSchema<
  SearchRequestAssetReferenceCreateWithoutSearchRequestInput,
  SearchRequestAssetReferenceUpdateInput
> = prismaSchemaBuilder<
  SearchRequestAssetReferenceCreateWithoutSearchRequestInput,
  SearchRequestAssetReferenceUpdateInput
>(() => ({
  props: {
    asset: reference(),
    assetId: reference(),
    tags: property(),
  },
  create: {},
  update: {},
}));

export const searchRequestSchema: PrismaSchemaFromGraphql<
  typeof CreateOneSearchRequestMutation,
  typeof UpdateOneSearchRequestMutation
> = prismaInputBuilderFromGraphql({
  create: CreateOneSearchRequestMutation,
  update: UpdateOneSearchRequestMutation,
})(() => ({
  props: {
    state: property(),
    buildingComponentName: property(),
    buildingComponentDescription: property(),
    quantity: property(),
    quantityUnit: property(),
    deadlineFound: property(),
    deadlineShipment: property(),
    comments: property(),
    budgetInRappens: property(),
    budgetNotes: property(),
    searchConceptNotes: property(),
    huntingStatusNotes: property(),
    fireProtectionNotes: property(),
    soundProofNotes: property(),
    securityNotes: property(),
    fallbackLevel: property(),
    fallbackLevelCO2PerUnit: property(),
    fallbackLevelCO2Total: property(),
    projectId: reference(),
    responsibleUserId: reference(),
    categoryId: reference(),
    ebkphCategoryId: reference(),
    interestsIds: manyReference(),
    dimensionRanges: manyRelation(() => dimensionRangeSchema.relation()),
    dimensionRangesIds: manyReference(),
    assets: manyRelation(() => searchRequestAssetSchema.relation()),
    assetsIds: manyReference(),
    assignedBuildingComponentsIds: manyReference(),
    createdAt: property(),
  },
  create: {} as any,
  update: {},
}));

if (!searchRequestSchema.updateSchema) {
  throw new Error('Project updateSchema not defined');
}

if (!searchRequestSchema.createSchema) {
  throw new Error('Project createSchema not defined');
}

export const SearchRequestCreateResource = prismaResource({
  resourceId,
  formModelType: 'query',
  fragment: SearchRequestFragment,
  schema: searchRequestSchema.createSchema,
  query: CreateSearchRequestDefaultsQuery,
  mutation: CreateOneSearchRequestMutation,
  queryDataToModel: (data, noDefaults) =>
    !noDefaults && data?.me?.id
      ? {
          responsibleUserId: { id: data?.me?.id },
        }
      : undefined,
  mutationDataToModel: (data) =>
    getFragment(SearchRequestFragment, data.createOneSearchRequest),
});

export const SearchRequestUpdateResource = prismaResource({
  resourceId,
  formModelType: 'query',
  fragment: SearchRequestFragment,
  schema: searchRequestSchema.updateSchema,
  query: OneSearchRequestQuery,
  mutation: UpdateOneSearchRequestMutation,
  queryDataToModel: (data) =>
    getFragment(SearchRequestFragment, data.searchRequest),
  mutationDataToModel: (data) =>
    getFragment(SearchRequestFragment, data.updateOneSearchRequest),
});
