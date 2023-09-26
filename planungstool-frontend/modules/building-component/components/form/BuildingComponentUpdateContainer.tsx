import {
  gotoBuildingComponentImages,
  gotoBuildingComponentsList,
  gotoListOfSearchRequestInterests,
  gotoMaterialDepotBuildingComponentsList,
} from '../../../../lib/locations';

import { DeleteOutlined, PictureOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { useQueryParams } from '../../../../lib/useQueryParams';
import { BreadcrumpPanel } from '../../../core/components/PageBreadcrump';
import { FormWithBottom } from '../../../forms/components/antd/FormComponents';
import { FormFooter } from '../../../forms/components/antd/FormFooter';
import { MaterialsDepotBreadcrump } from '../../../materials-depot/components/MaterialsDepotBreadcrump';
import { GenericGraphQLErrorAlert } from '../../../ui/core/components/GenericErrorAlert';
import { WaitForFormQuery } from '../../../ui/core/components/antd/WaitForQuery';
import { usePrismaForm } from '../../../ui/form/hooks/usePrismaForms';
import { useDeleteBuildingComponent } from '../../hooks/useDeleteBuildingComponent';
import { BuildingComponentUpdateResource } from '../../resource';
import { BuildingComponentsBreadcrump } from '../BuildingComponentsBreadcrump';
import { BuildingComponentForm } from './BuildingComponentForm';
import Link from 'next/link';

type BuildingComponentUpdateContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  buildingComponentId: string;
};

const Base = styled.div`
  position: relative;
`;

export const BuildingComponentUpdateContainer: React.FC<
  BuildingComponentUpdateContainerProps
> = ({ style, className }) => {
  const router = useRouter();
  const { onDelete } = useDeleteBuildingComponent({
    onSuccess: () => router.push(gotoBuildingComponentsList().href),
  });

  const { t } = useTranslation();
  const { materialsDepotId, buildingComponentId } = useQueryParams([
    'materialsDepotId',
    'buildingComponentId',
  ]);

  const { formMutation, formQuery } = usePrismaForm({
    ...BuildingComponentUpdateResource,
    queryVariables: {
      where: { id: buildingComponentId },
    },
    onClose: (data) => {
      if (!data) {
        router.back();
        return;
      }
      if (materialsDepotId) {
        router.push(
          gotoMaterialDepotBuildingComponentsList(materialsDepotId).href,
        );
      } else {
        router.push(gotoBuildingComponentsList().href);
      }
    },
  });

  return (
    <Base style={style} className={className}>
      <BreadcrumpPanel>
        {materialsDepotId ? (
          <MaterialsDepotBreadcrump
            buildingComponent={{
              id: buildingComponentId,
              componentId: formQuery?.model?.buildingComponent?.componentId,
            }}
            materialsDepot={formQuery.model?.buildingComponent?.materialsDepot}
          />
        ) : null}
        {!materialsDepotId ? (
          <BuildingComponentsBreadcrump
            buildingComponent={{
              id: buildingComponentId,
              componentId: formQuery?.model?.buildingComponent?.componentId,
            }}
          />
        ) : null}
        <Space>
          <Link
            {...gotoBuildingComponentImages({
              materialsDepotId,
              buildingComponentId,
            })}
          >
            <Button icon={<PictureOutlined />} />
          </Link>
          <Link
            {...gotoListOfSearchRequestInterests({
              buildingComponentId: formQuery.model?.buildingComponent?.id,
            })}
          >
            <Button>
              {t('common:resources.SearchRequestInterest.manyInterests')}
            </Button>
          </Link>
          <Button
            onClick={() => onDelete(buildingComponentId)}
            icon={<DeleteOutlined />}
          />
        </Space>
      </BreadcrumpPanel>
      <FormWithBottom>
        <WaitForFormQuery queryInfo={formQuery}>
          <BuildingComponentForm form={formMutation.form as any} />
        </WaitForFormQuery>
        <GenericGraphQLErrorAlert error={formMutation.error} />
      </FormWithBottom>
      <FormFooter schemaForm={formMutation} justifyRow="start" stick />
    </Base>
  );
};
