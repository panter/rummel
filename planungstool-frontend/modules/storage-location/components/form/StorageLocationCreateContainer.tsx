import React from 'react';
import { Divider } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FormWithBottom } from '../../../forms/components/antd/FormComponents';
import { FormFooter } from '../../../forms/components/antd/FormFooter';
import { GenericGraphQLErrorAlert } from '../../../ui/core/components/GenericErrorAlert';
import { WaitForFormQuery } from '../../../ui/core/components/antd/WaitForQuery';
import { StorageLocationForm } from './StorageLocationForm';
import { useStorageLocationCreateForm } from '../../hooks/useStorageLocationForm';
import { gotoListOfStorageLocation } from '../../../../lib/locations';
import { StorageLocationBreadcrumb } from '../StorageLocationBreadcrump';

type StorageLocationCreateContainerProps = {
  style?: React.CSSProperties;
  className?: string;
};

const Base = styled.div``;

export const StorageLocationCreateContainer: React.FC<
  StorageLocationCreateContainerProps
> = ({ style, className }) => {
  const router = useRouter();
  const { formMutation, formQuery } = useStorageLocationCreateForm((data) => {
    if (!data) {
      router.back();
      return;
    }
    router.push(gotoListOfStorageLocation().href);
  });

  return (
    <Base style={style} className={className}>
      <StorageLocationBreadcrumb create />
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
