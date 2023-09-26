import {
  InferSchema,
  manyReference,
  manyRelation,
  prismaSchemaBuilder,
  property,
  reference,
} from '@panter/prisma-inputs';
import {
  BuildingComponentAssetReferenceCreateWithoutBuildingComponentInput,
  BuildingComponentAssetReferenceUpdateInput,
  BuildingComponentFragment as BuildingComponentFragmentType,
  SortOrder,
} from '../../@generated/graphql';
import {
  PrismaSchemaFromGraphql,
  prismaInputBuilderFromGraphql,
} from '../ui/form/utils/prismaInputBuilderFromGraphql';

import { Typography } from 'antd';
import styled from 'styled-components';
import { graphql } from '../../@generated';
import { getFragment } from '../../lib/getFragment';
import { contactSchema } from '../contact/resource';
import { dimensionSchema } from '../dimension/resource';
import { selectedFindVariables } from '../forms/components/antd/input/ReferenceSelect';
import { formReferenceSelectResource } from '../ui/form/hooks/antd/useSelect';
import { prismaResource } from '../ui/form/hooks/usePrismaForms';

export const CreateOneBuildingComponentMutation = graphql(/* GraphQL */ `
  mutation CreateOneBuildingComponent($data: BuildingComponentCreateInput!) {
    createOneBuildingComponent(data: $data) {
      id
      ...BuildingComponent
    }
  }
`);

export const UpdateOneBuildingComponentMutation = graphql(/* GraphQL */ `
  mutation UpdateOneBuildingComponent(
    $where: EntityIdInput!
    $data: BuildingComponentUpdateInput!
  ) {
    updateOneBuildingComponent(where: $where, data: $data) {
      id
      ...BuildingComponent
    }
  }
`);

export const DeleteOneBuildingComponentMutation = graphql(/* GraphQL */ `
  mutation DeleteOneBuildingComponent($where: EntityIdInput!) {
    deleteOneBuildingComponent(where: $where) {
      id
      ...BuildingComponent
    }
  }
`);

export const BuildingComponentQuery = graphql(/* GraphQL */ `
  query BuildingComponent($where: EntityIdInput!) {
    buildingComponent(where: $where) {
      id
      componentId
      materialsDepot {
        id
        shortName
      }
      searchRequestInterests {
        id
      }
      ...BuildingComponent
      ...BuildingComponentReferenceSelector
    }
  }
`);

export const CreateBuildingComponentDefaultsQuery = graphql(/* GraphQL */ `
  query createBuildingComponentDefaults($materialsDepotId: String!) {
    me {
      id
    }
    materialsDepot(where: { id: $materialsDepotId }) {
      id
      shortName
    }
  }
`);

export const BuildingComponentFragment = graphql(/* GraphQL */ `
  fragment BuildingComponent on BuildingComponent {
    id
    state
    phase
    componentId
    name
    description
    quantity
    quantityExact
    quantityUnit
    quantitySpare
    quantityNotes
    sparePartsNotes
    constructionYear
    constructionYearExact
    constructionYearNotes
    co2Savings
    co2SavingsExact
    condition
    harmfulSubstances
    reusePotential
    reusePotentialNotes
    reusePotentialConclusion
    locationInBuilding
    locationInBuildingDetail
    showInMatching
    reuseValuePerUnit
    reuseValueTotal
    reuseValueDescription
    ru1Explanation
    ru2Explanation
    ru3Explanation
    ru1PerUnit
    ru2PerUnit
    ru3PerUnit
    ruPerUnitSum
    fallbackLevel
    fallbackLevelCO2PerUnit
    fallbackLevelCO2Total
    co2SavingsPerUnit
    ru1Total
    ru2Total
    ru3Total
    ruTotalSum
    co2SavingsTotal
    co2Unit
    co2QuantityUsed
    transportDistanceInKm
    transportVehicleName
    categoryId {
      id
    }
    dimensions {
      id
      type
      width
      depth
      height
      isExact
    }
    dimensionsNotes
    demolitionPhase
    potentialInterests
    warrantyDetails
    ebkphCategoryId {
      id
    }
    materialsDepot {
      id
      name
      shortName
    }
    materialsDepotId {
      id
    }
    storageLocationId {
      id
    }
    storageLocationNotes
    contacts {
      id
      type
      firstLine
      firstName
      lastName
      street
      postalCode
      city
      country
      canton
      notes
      contact1
      contact2
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
    mainImageId {
      id
      url
    }
    searchRequestInterests {
      id
    }
    ...BuildingComponentReferenceSelector
  }
`);

export const BuildingComponentReferenceSelectorFragment =
  graphql(/* GraphQL */ `
    fragment BuildingComponentReferenceSelector on BuildingComponent {
      id
      name
      componentId
      quantity
      searchRequestInterests {
        id
      }
    }
  `);

export const ReferenceBuildingComponentQuery = graphql(/* GraphQL */ `
  query buildingComponentReference(
    $where: BuildingComponentWhereInput
    $orderBy: [BuildingComponentOrderByInput!]
  ) {
    buildingComponents(where: $where, orderBy: $orderBy) {
      id
      ...BuildingComponentReferenceSelector
    }
  }
`);

export const buildingComponentAssetSchema: InferSchema<
  BuildingComponentAssetReferenceCreateWithoutBuildingComponentInput,
  BuildingComponentAssetReferenceUpdateInput
> = prismaSchemaBuilder<
  BuildingComponentAssetReferenceCreateWithoutBuildingComponentInput,
  BuildingComponentAssetReferenceUpdateInput
>(() => ({
  props: {
    asset: reference(),
    assetId: reference(),
    tags: property(),
  },
  create: {},
  update: {},
}));

const resourceId = 'BuildingComponent';

export const buildingComponentSchema: PrismaSchemaFromGraphql<
  typeof CreateOneBuildingComponentMutation,
  typeof UpdateOneBuildingComponentMutation
> = prismaInputBuilderFromGraphql({
  create: CreateOneBuildingComponentMutation,
  update: UpdateOneBuildingComponentMutation,
})(() => ({
  props: {
    state: property(),
    name: property(),
    description: property(),
    quantity: property(),
    quantityExact: property(),
    quantityUnit: property(),
    quantitySpare: property(),
    quantityNotes: property(),
    sparePartsNotes: property(),
    constructionYear: property(),
    constructionYearExact: property(),
    constructionYearNotes: property(),
    co2Savings: property(),
    co2SavingsExact: property(),
    condition: property(),
    harmfulSubstances: property(),
    locationInBuilding: property(),
    reusePotential: property(),
    reusePotentialNotes: property(),
    reusePotentialConclusion: property(),
    locationInBuildingDetail: property(),
    showInMatching: property(),
    reuseValuePerUnit: property(),
    reuseValueTotal: property(),
    reuseValueDescription: property(),
    ru1Explanation: property(),
    ru2Explanation: property(),
    ru3Explanation: property(),
    ru1PerUnit: property(),
    ru2PerUnit: property(),
    ru3PerUnit: property(),
    ruPerUnitSum: property(),
    fallbackLevel: property(),
    fallbackLevelCO2PerUnit: property(),
    fallbackLevelCO2Total: property(),
    co2SavingsPerUnit: property(),
    ru1Total: property(),
    ru2Total: property(),
    ru3Total: property(),
    ruTotalSum: property(),
    co2SavingsTotal: property(),
    co2Unit: property(),
    co2QuantityUsed: property(),
    transportDistanceInKm: property(),
    demolitionPhase: property(),
    potentialInterests: property(),
    warrantyDetails: property(),
    transportVehicleName: property(),
    categoryId: reference(),
    ebkphCategoryId: reference(),
    materialsDepotId: reference(),
    mainImageId: reference(),
    dimensions: manyRelation(() => dimensionSchema.relation()),
    dimensionsIds: manyReference(),
    dimensionsNotes: property(),
    assets: manyRelation(() => buildingComponentAssetSchema.relation()),
    assetsIds: manyReference(),
    searchRequestInterestsIds: manyReference(),
    storageLocationId: reference(),
    storageLocationNotes: property(),
    assignedToId: reference(),
    contactsIds: manyReference(),
    contacts: manyRelation(() => contactSchema.relation()),
    phase: property(),
  },
  create: {},
  update: {},
}));

if (!buildingComponentSchema.updateSchema) {
  throw new Error('BuildingComponent updateSchema not defined');
}

if (!buildingComponentSchema.createSchema) {
  throw new Error('BuildingComponent createSchema not defined');
}

export const BuildingComponentCreateResource = prismaResource({
  formModelType: 'query',
  fragment: BuildingComponentFragment,
  resourceId,
  schema: buildingComponentSchema.createSchema,
  query: CreateBuildingComponentDefaultsQuery,
  mutation: CreateOneBuildingComponentMutation,
  queryDataToModel: (data) => {
    return data?.me?.id
      ? {
          responsableUserId: { id: data?.me?.id },
        }
      : undefined;
  },
  mutationDataToModel: (data) =>
    getFragment(BuildingComponentFragment, data.createOneBuildingComponent),
});

export const BuildingComponentUpdateResource = prismaResource({
  formModelType: 'query',
  fragment: BuildingComponentFragment,
  resourceId,
  schema: buildingComponentSchema.updateSchema,
  query: BuildingComponentQuery,
  mutation: UpdateOneBuildingComponentMutation,
  queryDataToModel: (data) =>
    getFragment(BuildingComponentFragment, data.buildingComponent),
  mutationDataToModel: (data) =>
    getFragment(BuildingComponentFragment, data.updateOneBuildingComponent),
});

const BuildingComponentOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const BuildingComponentReferenceSelect = formReferenceSelectResource({
  resourceId,
  findManyQuery: ReferenceBuildingComponentQuery,
  defaultVariables: {
    orderBy: { name: SortOrder.Asc },
    where: {
      assignedTo: {
        id: { equals: null },
      },
    },
  },
  selectedFindVars: selectedFindVariables,
  manyResult: (e) =>
    getFragment(
      BuildingComponentReferenceSelectorFragment,
      e.buildingComponents,
    ),
  searchToManyVars: (e) => ({
    where: {
      name: { contains: e },
      assignedTo: {
        id: { equals: null },
      },
    },
  }),
  toOption: (e) =>
    e
      ? {
          value: e.id,
          label: (
            <BuildingComponentOption>
              <div>
                <Typography.Text>{e.name}</Typography.Text>
                <Typography.Text italic>({e.quantity})</Typography.Text>
              </div>

              <Typography.Text italic>{e.componentId}</Typography.Text>
            </BuildingComponentOption>
          ),
          keys: [e.id, e.name || '', e.componentId || ''],
        }
      : undefined,
});
