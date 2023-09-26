import {
  CreateOneMaterialsDepotMutation,
  UpdateOneMaterialsDepotMutation,
} from '../../../@generated/graphql';
import { usePrismaForm } from '../../ui/form/hooks/usePrismaForms';
import {
  MaterialsDepotCreateResource,
  MaterialsDepotUpdateResource,
} from '../resource';

export const useMaterialsDepotCreateForm = (
  onClose?:
    | ((v?: CreateOneMaterialsDepotMutation | null | undefined) => void)
    | undefined,
) => {
  const formReturn = usePrismaForm({
    ...MaterialsDepotCreateResource,
    onClose,
  });

  const formMutation = formReturn.formMutation;
  return { ...formReturn, formMutation };
};

export const useMaterialsDepotUpdateForm = (
  materialsDepotId: string,
  onClose?:
    | ((v?: UpdateOneMaterialsDepotMutation | null | undefined) => void)
    | undefined,
) => {
  const formReturn = usePrismaForm({
    ...MaterialsDepotUpdateResource,
    queryVariables: {
      where: { id: materialsDepotId },
    },
    onClose,
  });

  const formMutation = formReturn.formMutation;
  return { ...formReturn, formMutation };
};
