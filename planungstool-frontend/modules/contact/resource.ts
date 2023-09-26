import {
  InferSchema,
  prismaSchemaBuilder,
  property,
} from '@panter/prisma-inputs';
import { sortBy } from 'lodash';
import { graphql } from '../../@generated';
import {
  ContactCreateWithoutMaterialsDepotInput,
  ContactUpdateInput,
  SortOrder,
} from '../../@generated/graphql';
import { getFragment } from '../../lib/getFragment';
import { selectedFindVariables } from '../forms/components/antd/input/ReferenceSelect';
import { notNil } from '../ui/core/utils/arrays';
import { formReferenceSelectResource } from '../ui/form/hooks/antd/useSelect';

export const ContactReferenceSelectorFragment = graphql(/* GraphQL */ `
  fragment ContactReferenceSelector on Contact {
    id
    firstName
    lastName
    postalCode
    city
  }
`);

export const ContactReferenceQuery = graphql(/* GraphQL */ `
  query ContactReference(
    $where: ContactWhereInput
    $orderBy: [ContactOrderByInput!]
  ) {
    contacts(where: $where, orderBy: $orderBy) {
      id
      ...ContactReferenceSelector
    }
    contactsCount
  }
`);

const resourceId = 'Contact';

export const ContactReferenceSelect = formReferenceSelectResource({
  resourceId,
  findManyQuery: ContactReferenceQuery,
  mapOptions: (options) => sortBy(options, 'label'),
  defaultVariables: {
    orderBy: { firstName: SortOrder.Asc },
  },
  selectedFindVars: selectedFindVariables,
  manyResult: (e) => getFragment(ContactReferenceSelectorFragment, e.contacts),
  manyCount: (e) => e.contactsCount,
  searchToManyVars: (contains) => ({
    where: {
      OR: [
        { lastName: { contains } },
        { firstName: { contains } },
        { city: { contains } },
        { postalCode: { contains } },
        { street: { contains } },
      ],
    },
  }),
  toOption: (e) => {
    return e
      ? {
          value: e.id,
          label: [e.firstName, e.lastName, e.postalCode, e.city]
            .filter(notNil)
            .join(' / '),
          keys: [e.id],
        }
      : undefined;
  },
});

export const contactSchema: InferSchema<
  ContactCreateWithoutMaterialsDepotInput,
  ContactUpdateInput
> = prismaSchemaBuilder<
  ContactCreateWithoutMaterialsDepotInput,
  ContactUpdateInput
>(() => ({
  props: {
    type: property(),
    firstLine: property(),
    firstName: property(),
    lastName: property(),
    city: property(),
    country: property(),
    postalCode: property(),
    street: property(),
    contact1: property(),
    contact2: property(),
    notes: property(),
  },
  create: {},
  update: {},
}));
