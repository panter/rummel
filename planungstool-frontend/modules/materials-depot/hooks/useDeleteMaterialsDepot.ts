import { DeleteOneMaterialsDepotMutation } from '../resource';
import { MaterialsDepot } from '../../../@generated/graphql';
import confirm from 'antd/lib/modal/confirm';
import { isEmpty } from 'lodash';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';

export const useDeleteMaterialsDepot = (props: { onSuccess?: () => void }) => {
  const [deleteMutation] = useMutation(DeleteOneMaterialsDepotMutation);
  const { t } = useTranslation();

  const onDelete = async (materialsDepot: MaterialsDepot) => {
    confirm({
      title: isEmpty(materialsDepot.buildingComponents)
        ? `Do you really want delete ${materialsDepot.name}?`
        : 'Delete has and affect for following building components',
      content: isEmpty(materialsDepot.buildingComponents)
        ? ''
        : materialsDepot.buildingComponents
            .map((buildingComponent) => `${buildingComponent.name}`)
            .join(`,\n`),
      okText: t('common:common.delete'),
      onOk: async () => {
        try {
          await deleteMutation({
            variables: {
              where: {
                id: materialsDepot.id,
              },
            },
          });

          props.onSuccess?.();
        } catch (error: any) {
          confirm({
            title: error.message,
            type: 'error',
          });
        }
      },
    });
  };

  return { onDelete };
};
