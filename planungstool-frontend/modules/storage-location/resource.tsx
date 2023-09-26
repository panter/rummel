import {
  InferSchema,
  manyReference,
  manyRelation,
  prismaSchemaBuilder,
  property,
  reference,
} from '@panter/prisma-inputs';
import {
  SortOrder,
  StorageLocationAssetReferenceCreateWithoutStorageLocationInput,
  StorageLocationAssetReferenceUpdateInput,
} from '../../@generated/graphql';
import {
  PrismaSchemaFromGraphql,
  prismaInputBuilderFromGraphql,
} from '../ui/form/utils/prismaInputBuilderFromGraphql';

import { graphql } from '../../@generated';
import { getFragment } from '../../lib/getFragment';
import { buildingComponentSchema } from '../building-component/resource';
import { contactSchema } from '../contact/resource';
import { selectedFindVariables } from '../forms/components/antd/input/ReferenceSelect';
import { formReferenceSelectResource } from '../ui/form/hooks/antd/useSelect';
import { prismaResource } from '../ui/form/hooks/usePrismaForms';

export const CreateOneStorageLocationMutation = graphql(/* GraphQL */ `
  mutation CreateOneStorageLocation($data: StorageLocationCreateInput!) {
    createOneStorageLocation(data: $data) {
      id
      name
      ...StorageLocation
    }
  }
`);

export const UpdateOneStorageLocationMutation = graphql(/* GraphQL */ `
  mutation UpdateOneStorageLocation(
    $where: EntityIdInput!
    $data: StorageLocationUpdateInput!
  ) {
    updateOneStorageLocation(where: $where, data: $data) {
      id
      name
      ...StorageLocation
    }
  }
`);
export const OneStorageLocationQuery = graphql(/* GraphQL */ `
  query oneStorageLocation($where: EntityIdInput!) {
    storageLocation(where: $where) {
      id
      name
      ...StorageLocation
      ...StorageLocationReferenceSelector
    }
  }
`);

export const StorageLocationReferenceSelectorFragment = graphql(/* GraphQL */ `
  fragment StorageLocationReferenceSelector on StorageLocation {
    id
    name
  }
`);

export const ReferenceStorageLocationQuery = graphql(/* GraphQL */ `
  query storageLocationsReference(
    $where: StorageLocationWhereInput
    $orderBy: [StorageLocationOrderByInput!]
  ) {
    storageLocations(where: $where, orderBy: $orderBy) {
      id
      name
      ...StorageLocationReferenceSelector
    }
  }
`);

export const StorageLocationFragment = graphql(/* GraphQL */ `
  fragment StorageLocation on StorageLocation {
    id
    name
    country
    canton
    city
    street
    googleMapsLink
    postalCode
    mainImage {
      id
    }
    contacts {
      id
      type
      firstLine
      firstName
      lastName
      street
      postalCode
      canton
      city
      country
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
    buildingComponents {
      id
    }
    mainImage {
      id
      url
    }
    notes
  }
`);

const resourceId = 'StorageLocation';

export const CreateStorageLocationDefaultsQuery = graphql(/* GraphQL */ `
  query createStorageLocationDefaults {
    me {
      id
    }
  }
`);

export const storageLocationAssetSchema: InferSchema<
  StorageLocationAssetReferenceCreateWithoutStorageLocationInput,
  StorageLocationAssetReferenceUpdateInput
> = prismaSchemaBuilder<
  StorageLocationAssetReferenceCreateWithoutStorageLocationInput,
  StorageLocationAssetReferenceUpdateInput
>(() => ({
  props: {
    asset: reference(),
    assetId: reference(),
    tags: property(),
  },
  create: {},
  update: {},
}));

export const storageLocationSchema: PrismaSchemaFromGraphql<
  typeof CreateOneStorageLocationMutation,
  typeof UpdateOneStorageLocationMutation
> = prismaInputBuilderFromGraphql({
  create: CreateOneStorageLocationMutation,
  update: UpdateOneStorageLocationMutation,
})(() => ({
  props: {
    name: property(),
    googleMapsLink: property(),
    notes: property(),
    city: property(),
    country: property(),
    postalCode: property(),
    street: property(),
    assets: manyRelation(() => storageLocationAssetSchema.relation()),
    assetsIds: manyReference(),
    buildingComponentsIds: manyReference(),
    buildingComponents: manyRelation(() => buildingComponentSchema.relation()),
    mainImageId: reference(),
    contacts: manyRelation(() => contactSchema.relation()),
    contactsIds: manyReference(),
  },
  create: {},
  update: {},
}));

if (!storageLocationSchema.updateSchema) {
  throw new Error('BuildingComponent updateSchema not defined');
}

if (!storageLocationSchema.createSchema) {
  throw new Error('BuildingComponent createSchema not defined');
}

export const StorageLocationCreateResource = prismaResource({
  resourceId,
  formModelType: 'query',
  fragment: StorageLocationFragment,
  schema: storageLocationSchema.createSchema,
  query: CreateStorageLocationDefaultsQuery,
  mutation: CreateOneStorageLocationMutation,
  mutationDataToModel: (data) =>
    getFragment(StorageLocationFragment, data.createOneStorageLocation),
});

export const StorageLocationUpdateResource = prismaResource({
  resourceId,
  formModelType: 'query',
  fragment: StorageLocationFragment,
  schema: storageLocationSchema.updateSchema,
  query: OneStorageLocationQuery,
  mutation: UpdateOneStorageLocationMutation,
  queryDataToModel: (data) =>
    getFragment(StorageLocationFragment, data.storageLocation),
  mutationDataToModel: (data) =>
    getFragment(StorageLocationFragment, data.updateOneStorageLocation),
});

export const StorageLocationReferenceSelect = formReferenceSelectResource({
  resourceId,
  findManyQuery: ReferenceStorageLocationQuery,
  defaultVariables: { orderBy: { name: SortOrder.Asc } },
  selectedFindVars: selectedFindVariables,
  manyResult: (e) =>
    getFragment(StorageLocationReferenceSelectorFragment, e.storageLocations),
  searchToManyVars: (e) => ({
    where: { name: { contains: e } },
  }),
  toOption: (e) =>
    e
      ? {
          value: e.id,
          label: e.name,
          keys: [e.id, e.name],
        }
      : undefined,
});
