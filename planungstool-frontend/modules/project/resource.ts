import {
  InferSchema,
  manyReference,
  manyRelation,
  prismaSchemaBuilder,
  property,
  reference,
} from '@panter/prisma-inputs';
import {
  ProjectAssetReferenceCreateWithoutProjectInput,
  ProjectAssetReferenceUpdateInput,
  SortOrder,
} from '../../@generated/graphql';
import {
  PrismaSchemaFromGraphql,
  prismaInputBuilderFromGraphql,
} from '../ui/form/utils/prismaInputBuilderFromGraphql';

import { sortBy } from 'lodash';
import { graphql } from '../../@generated';
import { getFragment } from '../../lib/getFragment';
import { contactSchema } from '../contact/resource';
import { selectedFindVariables } from '../forms/components/antd/input/ReferenceSelect';
import { formReferenceSelectResource } from '../ui/form/hooks/antd/useSelect';
import { prismaResource } from '../ui/form/hooks/usePrismaForms';

export const CreateOneProjectMutation = graphql(/* GraphQL */ `
  mutation CreateOneProject($data: ProjectCreateInput!) {
    createOneProject(data: $data) {
      id
      shortName
      name
      ...Project
    }
  }
`);

export const UpdateOneProjectMutation = graphql(/* GraphQL */ `
  mutation UpdateOneProject(
    $where: EntityIdInput!
    $data: ProjectUpdateInput!
  ) {
    updateOneProject(where: $where, data: $data) {
      id
      shortName
      name
      ...Project
    }
  }
`);

export const OneProjectQuery = graphql(/* GraphQL */ `
  query oneProject($where: EntityIdInput!) {
    project(where: $where) {
      id
      name
      shortName

      ...Project
    }
  }
`);

export const CreateProjectDefaultsQuery = graphql(/* GraphQL */ `
  query projectDefaults {
    me {
      id
    }
  }
`);

export const ProjectFragment = graphql(/* GraphQL */ `
  fragment Project on Project {
    id
    shortName
    name
    state
    phase
    city
    country
    postalCode
    street
    responsableUserPM {
      id
    }
    responsableUserSearch {
      id
    }
    notes
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
  }
`);

export const ProjectReferenceSelectorFragment = graphql(/* GraphQL */ `
  fragment ProjectReferenceSelector on Project {
    id
    shortName
    name
  }
`);

export const ProjectReferenceQuery = graphql(/* GraphQL */ `
  query projectReference(
    $where: ProjectWhereInput
    $orderBy: [ProjectOrderByInput!]
  ) {
    projects(where: $where, orderBy: $orderBy) {
      id
      ...ProjectReferenceSelector
    }
    projectsCount
  }
`);

const resourceId = 'Project';

export const projectAssetSchema: InferSchema<
  ProjectAssetReferenceCreateWithoutProjectInput,
  ProjectAssetReferenceUpdateInput
> = prismaSchemaBuilder<
  ProjectAssetReferenceCreateWithoutProjectInput,
  ProjectAssetReferenceUpdateInput
>(() => ({
  props: {
    asset: reference(),
    assetId: reference(),
    tags: property(),
  },
  create: {},
  update: {},
}));

export const ProjectReferenceSelect = formReferenceSelectResource({
  resourceId,
  findManyQuery: ProjectReferenceQuery,
  mapOptions: (options) => sortBy(options, 'label'),
  defaultVariables: {
    orderBy: { name: SortOrder.Asc },
  },
  selectedFindVars: selectedFindVariables,
  manyResult: (e) => getFragment(ProjectReferenceSelectorFragment, e.projects),
  manyCount: (e) => e.projectsCount,
  searchToManyVars: (contains) => ({
    where: { name: { contains } },
  }),
  toOption: (e) => {
    return e
      ? {
          value: e.id,
          label: e.shortName,
          keys: [e.id, e.name],
        }
      : undefined;
  },
});

export const projectSchema: PrismaSchemaFromGraphql<
  typeof CreateOneProjectMutation,
  typeof UpdateOneProjectMutation
> = prismaInputBuilderFromGraphql({
  create: CreateOneProjectMutation,
  update: UpdateOneProjectMutation,
})(() => ({
  props: {
    type: property(),
    shortName: property(),
    name: property(),
    state: property(),
    phase: property(),
    city: property(),
    country: property(),
    postalCode: property(),
    street: property(),
    notes: property(),
    assets: manyRelation(() => projectAssetSchema.relation()),
    assetsIds: manyReference(),
    contacts: manyRelation(() => contactSchema.relation()),
    contactsIds: manyReference(),
    responsableUserPM: reference(),
    responsableUserSearch: reference(),
    responsableUserPMId: reference(),
    responsableUserSearchId: reference(),
    mainImageId: reference(),
  },
  create: {},
  update: {},
}));

if (!projectSchema.updateSchema) {
  throw new Error('Project updateSchema not defined');
}

if (!projectSchema.createSchema) {
  throw new Error('Project createSchema not defined');
}

export const ProjectCreateResource = prismaResource({
  resourceId,
  formModelType: 'query',
  fragment: ProjectFragment,
  schema: projectSchema.createSchema,
  query: CreateProjectDefaultsQuery,
  mutation: CreateOneProjectMutation,
  queryDataToModel: (data, noDefaults) =>
    !noDefaults && data?.me?.id
      ? {
          responsableUserPM: { id: data?.me?.id },
          responsableUserSearch: { id: data?.me?.id },
        }
      : undefined,
  mutationDataToModel: (data) =>
    getFragment(ProjectFragment, data.createOneProject),
});

export const ProjectUpdateResource = prismaResource({
  resourceId,
  formModelType: 'query',
  fragment: ProjectFragment,
  schema: projectSchema.updateSchema,
  query: OneProjectQuery,
  mutation: UpdateOneProjectMutation,
  queryDataToModel: (data) => getFragment(ProjectFragment, data.project),
  mutationDataToModel: (data) =>
    getFragment(ProjectFragment, data.updateOneProject),
});
