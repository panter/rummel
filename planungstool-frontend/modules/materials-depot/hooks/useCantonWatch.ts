import { graphql } from '../../../@generated';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

export const CantonQuery = graphql(/* GraphQL */ `
  query CantonByPostalCodeAndCityQuery(
    $input: CantonByPostalCodeAndCityInput!
  ) {
    cantonByPostalCodeAndCity(input: $input)
  }
`);

export function useCantonWatch(form: any): {
  canton: string;
} {
  const { watch, setValue } = form;
  const [fetchCanton, { data }] = useLazyQuery(CantonQuery);

  const postalCode: string | null | undefined = watch('postalCode');

  useEffect(() => {
    if (postalCode) {
      fetchCanton({
        variables: {
          input: {
            postalCode,
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postalCode]);

  useEffect(() => {
    setValue('canton', data?.cantonByPostalCodeAndCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.cantonByPostalCodeAndCity]);

  return { canton: data?.cantonByPostalCodeAndCity || '' };
}
