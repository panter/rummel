import { DeleteOneBuildingComponentMutation } from '../resource';
import confirm from 'antd/lib/modal/confirm';
import { useMutation } from '@apollo/client';

export const useDeleteBuildingComponent = (props: {
  onSuccess?: () => void;
}) => {
  const [deleteMutation] = useMutation(DeleteOneBuildingComponentMutation);

  const onDelete = async (buildingComponentId: string) => {
    confirm({
      title: 'Do you really want delete record?',
      onOk: async () => {
        await deleteMutation({
          variables: {
            where: {
              id: buildingComponentId,
            },
          },
        });

        props.onSuccess?.();
      },
    });
  };

  return { onDelete };
};
