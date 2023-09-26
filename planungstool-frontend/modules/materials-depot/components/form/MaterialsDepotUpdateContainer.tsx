import { PictureOutlined } from '@ant-design/icons';
import { Button, Divider, Space } from 'antd';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  gotoCreateNewBuildingComponentFromMaterialsDepot,
  gotoListOfMaterialsDepot,
  gotoListOfSearchRequestInterests,
  gotoMaterialDepotBuildingComponentsList,
  gotoMaterialsDepotImages,
} from '../../../../lib/locations';
import { BreadcrumpPanel } from '../../../core/components/PageBreadcrump';
import { FormWithBottom } from '../../../forms/components/antd/FormComponents';
import { FormFooter } from '../../../forms/components/antd/FormFooter';
import { GenericGraphQLErrorAlert } from '../../../ui/core/components/GenericErrorAlert';
import { WaitForFormQuery } from '../../../ui/core/components/antd/WaitForQuery';
import { useMaterialsDepotUpdateForm } from '../../hooks/useMaterialsDepotForm';
import { MaterialsDepotBreadcrump } from '../MaterialsDepotBreadcrump';
import { MaterialsDepotForm } from './MaterialsDepotForm';

type MaterialsDepotUpdateContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  materialsDepotId: string;
};

const Base = styled.div``;

export const MaterialsDepotUpdateContainer: React.FC<
  MaterialsDepotUpdateContainerProps
> = ({ style, className, materialsDepotId }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { formMutation, formQuery } = useMaterialsDepotUpdateForm(
    materialsDepotId,
    () => {
      router.push(gotoListOfMaterialsDepot().href);
    },
  );

  return (
    <Base style={style} className={className}>
      <BreadcrumpPanel>
        <MaterialsDepotBreadcrump
          materialsDepot={formQuery.model?.materialsDepot}
        />
        <Space>
          <Button
            icon={<PictureOutlined />}
            onClick={() =>
              router.push(gotoMaterialsDepotImages(materialsDepotId).href)
            }
          />
          <Button
            onClick={() =>
              router.push(
                gotoListOfSearchRequestInterests({
                  materialsDepotId: formQuery.model?.materialsDepot?.id,
                }).href,
              )
            }
          >
            {t('common:resources.SearchRequestInterest.manyInterests')}
          </Button>
          <Button
            onClick={() =>
              router.push(
                gotoMaterialDepotBuildingComponentsList(materialsDepotId).href,
              )
            }
          >
            {t('common:materials-depot.buttons.showBuildingComponents')}
          </Button>
          <Button
            onClick={() =>
              router.push(
                gotoCreateNewBuildingComponentFromMaterialsDepot(
                  materialsDepotId,
                ).href,
              )
            }
          >
            {t('common:resources.BuildingComponent.buttons.new')}
          </Button>
        </Space>
      </BreadcrumpPanel>
      <FormWithBottom>
        <WaitForFormQuery queryInfo={formQuery}>
          <MaterialsDepotForm form={formMutation.form} />
        </WaitForFormQuery>
        <GenericGraphQLErrorAlert error={formMutation.error} />
      </FormWithBottom>
      <Divider />
      <FormFooter
        schemaForm={formMutation}
        justifyRow="start"
        stick
      ></FormFooter>
    </Base>
  );
};
