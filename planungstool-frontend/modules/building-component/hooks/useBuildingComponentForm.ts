import {
  CreateOneBuildingComponentMutation,
  UpdateOneBuildingComponentMutation,
} from '../../../@generated/graphql';
import { usePrismaForm } from '../../ui/form/hooks/usePrismaForms';
import {
  BuildingComponentCreateResource,
  BuildingComponentUpdateResource,
} from '../resource';

export const useBuildingComponentCreateForm = (
  materialsDepotId: string,
  onClose?:
    | ((v?: CreateOneBuildingComponentMutation | null | undefined) => void)
    | undefined,
) => {
  const formReturn = usePrismaForm({
    ...BuildingComponentCreateResource,
    queryVariables: { materialsDepotId },
    defaultValues: {
      materialsDepotId: { id: materialsDepotId },
      contacts: [
        { type: 'Wiedereingebaut durch' },
        { type: 'Bauträgerschaft' },
        { type: 'Ausbau durch' },
        { type: 'Hersteller:in' },
      ],
    },

    onClose,
  });

  const formMutation = formReturn.formMutation;
  return { ...formReturn, formMutation };
};

export const useBuildingComponentUpdateForm = (
  buildingComponentId: string,
  onClose?:
    | ((v?: UpdateOneBuildingComponentMutation | null | undefined) => void)
    | undefined,
) => {
  const formReturn = usePrismaForm({
    ...BuildingComponentUpdateResource,
    queryVariables: {
      where: { id: buildingComponentId },
    },
    onClose,
  });

  const formMutation = formReturn.formMutation;
  return { ...formReturn, formMutation };
};
