import { isArray } from 'lodash';
import { graphql } from '../../@generated';
import { SortOrder } from '../../@generated/graphql';
import { getFragment } from '../../lib/getFragment';
import { selectedFindVariables } from '../forms/components/antd/input/ReferenceSelect';
import { formReferenceSelectResource } from '../ui/form/hooks/antd/useSelect';

export const OneUserQuery = graphql(/* GraphQL */ `
  query oneUser($where: EntityIdInput!) {
    user(where: $where) {
      id
      ...User
      ...UserReferenceSelector
    }
  }
`);

export const UserFragment = graphql(/* GraphQL */ `
  fragment User on User {
    id
    email
    notes
    ...UserReferenceSelector
  }
`);

export const UserReferenceSelectorFragment = graphql(/* GraphQL */ `
  fragment UserReferenceSelector on User {
    id
    email
  }
`);

export const ReferenceUserQuery = graphql(/* GraphQL */ `
  query userReference($where: UserWhereInput, $orderBy: [UserOrderByInput!]) {
    users(where: $where, orderBy: $orderBy, take: 50) {
      id
      ...UserReferenceSelector
    }

    usersCount
  }
`);

const resourceId = 'User';

export const UserReferenceSelect = formReferenceSelectResource({
  resourceId,
  findManyQuery: ReferenceUserQuery,
  defaultVariables: { orderBy: { email: SortOrder.Asc } },
  selectedFindVars: selectedFindVariables,
  manyResult: (e) => getFragment(UserReferenceSelectorFragment, e.users),
  manyCount: (e) => e.usersCount,
  searchToManyVars: (contains) => ({
    where: { email: { contains } },
  }),
  toOption: (e) =>
    e ? { value: e.id, label: e.email, keys: [e.id] } : undefined,
});
