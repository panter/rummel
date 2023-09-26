import {
  CreateOneProjectMutation,
  UpdateOneProjectMutation,
} from '../../../@generated/graphql';
import { usePrismaForm } from '../../ui/form/hooks/usePrismaForms';
import { ProjectCreateResource, ProjectUpdateResource } from '../resource';

export const useProjectCreateForm = (
  onClose?:
    | ((v?: CreateOneProjectMutation | null | undefined) => void)
    | undefined,
) => {
  const formReturn = usePrismaForm({
    ...ProjectCreateResource,
    onClose,
  });

  const formMutation = formReturn.formMutation;
  return { ...formReturn, formMutation };
};

export const useProjectUpdateForm = (
  projectId: string,
  onClose?:
    | ((v?: UpdateOneProjectMutation | null | undefined) => void)
    | undefined,
) => {
  const formReturn = usePrismaForm({
    ...ProjectUpdateResource,
    queryVariables: {
      where: { id: projectId },
    },
    onClose,
  });

  const formMutation = formReturn.formMutation;
  return { ...formReturn, formMutation };
};
