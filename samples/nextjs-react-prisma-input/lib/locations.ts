import { LinkProps } from 'next/link';

export const ADMIN = '/admin';
export const AUTOCOMPLETE = `${ADMIN}/autocomplete`;

export const gotoAutocompletesPrismaModal = (): LinkProps => ({
  href: `${AUTOCOMPLETE}/prisma-modal`,
});

export const gotoAutocompletesGraphqlModal = (): LinkProps => ({
  href: `${AUTOCOMPLETE}/graphql-modal`,
});
