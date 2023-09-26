import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import {
  gotoListOfStorageLocation,
  gotoStorageLocationBuildingComponentsList,
  gotoStorageLocationImages,
} from '../../../../lib/locations';
import { FormWithBottom } from '../../../forms/components/antd/FormComponents';
import { FormFooter } from '../../../forms/components/antd/FormFooter';
import { GenericGraphQLErrorAlert } from '../../../ui/core/components/GenericErrorAlert';
import { WaitForFormQuery } from '../../../ui/core/components/antd/WaitForQuery';
import { useStorageLocationUpdateForm } from '../../hooks/useStorageLocationForm';
import { StorageLocationForm } from './StorageLocationForm';
import { Button, Divider, Space } from 'antd';
import { BreadcrumpPanel } from '../../../core/components/PageBreadcrump';
import { useTranslation } from 'next-i18next';
import { PictureOutlined } from '@ant-design/icons';
import { StorageLocationBreadcrumb } from '../StorageLocationBreadcrump';

type StorageLocationUpdateContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  storageLocationId: string;
};

const Base = styled.div``;

export const StorageLocationUpdateContainer: React.FC<
  StorageLocationUpdateContainerProps
> = ({ style, className, storageLocationId }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { formMutation, formQuery } = useStorageLocationUpdateForm(
    storageLocationId,
    () => {
      router.push(gotoListOfStorageLocation().href);
    },
  );

  return (
    <Base style={style} className={className}>
      <BreadcrumpPanel>
        <StorageLocationBreadcrumb
          storageLocation={formQuery.model?.storageLocation}
        />
        <Space>
          <Button
            icon={<PictureOutlined />}
            onClick={() =>
              router.push(gotoStorageLocationImages(storageLocationId).href)
            }
          />
          <Button
            onClick={() =>
              router.push(
                gotoStorageLocationBuildingComponentsList(storageLocationId)
                  .href,
              )
            }
          >
            {t('common:materials-depot.buttons.showBuildingComponents')}
          </Button>
        </Space>
      </BreadcrumpPanel>
      <FormWithBottom>
        <WaitForFormQuery queryInfo={formQuery}>
          <StorageLocationForm form={formMutation.form} />
        </WaitForFormQuery>
        <GenericGraphQLErrorAlert error={formMutation.error} />
      </FormWithBottom>
      <Divider />
      <FormFooter schemaForm={formMutation} justifyRow="start" stick />
    </Base>
  );
};
