import { LinkProps } from 'next/link';

export const ADMIN = '/admin';
export const AUTOCOMPLETE = `${ADMIN}/autocomplete`;

export const gotoListOfAutocompletes = (): LinkProps => ({
  href: `${AUTOCOMPLETE}`,
});
