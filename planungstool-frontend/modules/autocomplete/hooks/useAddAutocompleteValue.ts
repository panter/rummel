import { DocumentNode, useMutation } from '@apollo/client';
import { CreateOneAutocompleteMutation } from '../resource';

export const useAddAutocompleteValue = (
  key: string,
  options?: { refetchQueries?: DocumentNode[] },
) => {
  const [add, mutationOptions] = useMutation(CreateOneAutocompleteMutation, {
    refetchQueries: options?.refetchQueries,
  });

  return [
    (value: string) =>
      add({ variables: { data: { key, value: value.trim() } } }),
    mutationOptions,
  ] as const;
};
