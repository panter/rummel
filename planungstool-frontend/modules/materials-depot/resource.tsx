import {
  InferSchema,
  manyReference,
  manyRelation,
  prismaSchemaBuilder,
  property,
  reference,
} from '@panter/prisma-inputs';
import {
  MaterialsDepotAssetReferenceCreateWithoutMaterialsDepotInput,
  MaterialsDepotAssetReferenceUpdateInput,
  SortOrder,
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
import { materialsDepotTimelineSchema } from '../materials-depot-timeline/resource';
import { taskSchema } from '../task/resource';
import { notNil } from '../ui/core/utils/arrays';
import { formReferenceSelectResource } from '../ui/form/hooks/antd/useSelect';
import { prismaResource } from '../ui/form/hooks/usePrismaForms';

export const CreateOneMaterialsDepotMutation = graphql(/* GraphQL */ `
  mutation CreateOneMaterialsDepot($data: MaterialsDepotCreateInput!) {
    createOneMaterialsDepot(data: $data) {
      id
      ...MaterialsDepot
    }
  }
`);

export const UpdateOneMaterialsDepotMutation = graphql(/* GraphQL */ `
  mutation UpdateOneMaterialsDepot(
    $where: EntityIdInput!
    $data: MaterialsDepotUpdateInput!
  ) {
    updateOneMaterialsDepot(where: $where, data: $data) {
      id
      ...MaterialsDepot
    }
  }
`);

export const OneMaterialsDepotQuery = graphql(/* GraphQL */ `
  query oneMaterialsDepot($where: EntityIdInput!) {
    materialsDepot(where: $where) {
      id
      shortName
      ...MaterialsDepot
      ...MaterialsDepotReferenceSelector
    }
  }
`);

export const CreateMaterialsDepotDefaultsQuery = graphql(/* GraphQL */ `
  query createMaterialsDepotDefaults {
    me {
      id
    }
  }
`);

export const MaterialsDepotFragment = graphql(/* GraphQL */ `
  fragment MaterialsDepot on MaterialsDepot {
    id
    state
    shortName
    name
    googleMapsLink
    complex
    notes
    historyNotes
    typology
    interventionDepth
    phase
    reUseRating
    constructionYear
    constructionYearExact
    city
    country
    postalCode
    canton
    street
    updatedAt
    assets {
      id
      tags
      createdAt
      updatedAt
      asset {
        id
        url
        originalFilename
        mimeType
      }
    }
    mainImageId {
      id
      originalFilename
      url
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
    tasks {
      id
      name
      closedAt
      dueDate
      createdAt
    }
    timelines {
      id
      description
      startDate
      endDate
      createdAt
    }
    buildingComponents {
      id
      componentId
      assets {
        id
        tags
        createdAt
        updatedAt
        asset {
          id
          url
          originalFilename
          mimeType
        }
      }
    }
    responsableUserId {
      id
    }
    ...MaterialsDepotReferenceSelector
  }
`);

export const DeleteOneMaterialsDepotMutation = graphql(/* GraphQL */ `
  mutation DeleteOneMaterialsDepot($where: EntityIdInput!) {
    deleteOneMaterialsDepot(where: $where) {
      id
      ...MaterialsDepot
    }
  }
`);

export const MaterialsDepotReferenceSelectorFragment = graphql(/* GraphQL */ `
  fragment MaterialsDepotReferenceSelector on MaterialsDepot {
    id
    shortName
    name
  }
`);

export const ReferenceMaterialsDepotQuery = graphql(/* GraphQL */ `
  query materialsDepotsReference(
    $where: MaterialsDepotWhereInput
    $orderBy: [MaterialsDepotOrderByInput!]
  ) {
    materialsDepots(where: $where, orderBy: $orderBy) {
      id
      ...MaterialsDepotReferenceSelector
    }
  }
`);

const resourceId = 'MaterialsDepot';

export const materialsDepotAssetSchema: InferSchema<
  MaterialsDepotAssetReferenceCreateWithoutMaterialsDepotInput,
  MaterialsDepotAssetReferenceUpdateInput
> = prismaSchemaBuilder<
  MaterialsDepotAssetReferenceCreateWithoutMaterialsDepotInput,
  MaterialsDepotAssetReferenceUpdateInput
>(() => ({
  props: {
    asset: reference(),
    assetId: reference(),
    tags: property(),
  },
  create: {},
  update: {},
}));

export const materialsDepotSchema: PrismaSchemaFromGraphql<
  typeof CreateOneMaterialsDepotMutation,
  typeof UpdateOneMaterialsDepotMutation
> = prismaInputBuilderFromGraphql({
  create: CreateOneMaterialsDepotMutation,
  update: UpdateOneMaterialsDepotMutation,
})(() => ({
  props: {
    state: property(),
    shortName: property(),
    name: property(),
    googleMapsLink: property(),
    complex: property(),
    notes: property(),
    historyNotes: property(),
    typology: property(),
    interventionDepth: property(),
    phase: property(),
    reUseRating: property(),
    constructionYear: property(),
    constructionYearExact: property(),
    city: property(),
    country: property(),
    postalCode: property(),
    street: property(),
    assets: manyRelation(() => materialsDepotAssetSchema.relation()),
    assetsIds: manyReference(),
    buildingComponentsIds: manyReference(),
    buildingComponents: manyRelation(() => buildingComponentSchema.relation()),
    responsableUserId: reference(),
    mainImageId: reference(),
    contacts: manyRelation(() => contactSchema.relation()),
    contactsIds: manyReference(),
    tasks: manyRelation(() => taskSchema.relation()),
    tasksIds: manyReference(),
    timelines: manyRelation(() => materialsDepotTimelineSchema.relation()),
    timelinesIds: manyReference(),
  },
  create: {},
  update: {},
}));

if (!materialsDepotSchema.updateSchema) {
  throw new Error('MaterialsDepot updateSchema not defined');
}

if (!materialsDepotSchema.createSchema) {
  throw new Error('MaterialsDepot createSchema not defined');
}

export const MaterialsDepotCreateResource = prismaResource({
  formModelType: 'query',
  fragment: MaterialsDepotFragment,
  resourceId,
  schema: materialsDepotSchema.createSchema,
  query: CreateMaterialsDepotDefaultsQuery,
  mutation: CreateOneMaterialsDepotMutation,
  queryDataToModel: (data, noDefaults) =>
    !noDefaults && data?.me?.id
      ? {
          responsableUserId: { id: data?.me?.id },
        }
      : undefined,
  mutationDataToModel: (data) =>
    getFragment(MaterialsDepotFragment, data.createOneMaterialsDepot),
});

export const MaterialsDepotUpdateResource = prismaResource({
  formModelType: 'query',
  fragment: MaterialsDepotFragment,
  resourceId,
  schema: materialsDepotSchema.updateSchema,
  query: OneMaterialsDepotQuery,
  mutation: UpdateOneMaterialsDepotMutation,
  queryDataToModel: (data) =>
    getFragment(MaterialsDepotFragment, data.materialsDepot),
  mutationDataToModel: (data) =>
    getFragment(MaterialsDepotFragment, data.updateOneMaterialsDepot),
});

export const MaterialsDepotReferenceSelect = formReferenceSelectResource({
  resourceId,
  findManyQuery: ReferenceMaterialsDepotQuery,
  defaultVariables: { orderBy: { name: SortOrder.Asc } },
  selectedFindVars: selectedFindVariables,
  manyResult: (e) =>
    getFragment(MaterialsDepotReferenceSelectorFragment, e.materialsDepots),
  searchToManyVars: (e) => ({
    where: { name: { contains: e } },
  }),
  toOption: (e) =>
    e
      ? {
          value: e.id,
          label: [e.shortName, e.name].filter(notNil).join(' - '),
          keys: [e.id, e.shortName],
        }
      : undefined,
});
