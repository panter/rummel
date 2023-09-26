import {
  CreateOneStorageLocationMutation,
  UpdateOneStorageLocationMutation,
} from '../../../@generated/graphql';
import { usePrismaForm } from '../../ui/form/hooks/usePrismaForms';
import {
  StorageLocationCreateResource,
  StorageLocationUpdateResource,
} from '../resource';

export const useStorageLocationCreateForm = (
  onClose?:
    | ((v?: CreateOneStorageLocationMutation | null | undefined) => void)
    | undefined,
) => {
  const formReturn = usePrismaForm({
    ...StorageLocationCreateResource,
    onClose,
  });

  const formMutation = formReturn.formMutation;
  return { ...formReturn, formMutation };
};

export const useStorageLocationUpdateForm = (
  storageLocationId: string,
  onClose?:
    | ((v?: UpdateOneStorageLocationMutation | null | undefined) => void)
    | undefined,
) => {
  const formReturn = usePrismaForm({
    ...StorageLocationUpdateResource,
    queryVariables: {
      where: { id: storageLocationId },
    },
    onClose,
  });

  const formMutation = formReturn.formMutation;
  return { ...formReturn, formMutation };
};
