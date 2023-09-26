import { DocumentNode, useMutation } from '@apollo/client';
import { DeleteOneAutocompleteMutation } from '../resource';

export const useDeleteAutocompleteValue = (options?: {
  refetchQueries?: DocumentNode[];
}) => {
  const [add, mutationOptions] = useMutation(DeleteOneAutocompleteMutation, {
    refetchQueries: options?.refetchQueries,
  });

  return [
    (id: string) => add({ variables: { where: { id } } }),
    mutationOptions,
  ] as const;
};
