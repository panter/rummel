import { Divider } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { FormWithBottom } from '../../../forms/components/antd/FormComponents';
import { FormFooter } from '../../../forms/components/antd/FormFooter';
import { GenericGraphQLErrorAlert } from '../../../ui/core/components/GenericErrorAlert';
import { WaitForFormQuery } from '../../../ui/core/components/antd/WaitForQuery';
import { usePrismaForm } from '../../../ui/form/hooks/usePrismaForms';
import { SearchRequestInterestCreateResource } from '../../resource';
import { SearchRequestInterestBreadcrumb } from '../SearchRequestInterestBreadcrumb';
import { SearchRequestInterestForm } from './SearchRequestInterestForm';

type ProjectCreateContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  defaultValues?: {
    searchRequestId?: string;
    buildingComponentId?: string;
  };
};

const Base = styled.div``;

export const SearchRequestInterestCreateContainer: React.FC<
  ProjectCreateContainerProps
> = ({ style, className, defaultValues }) => {
  const { searchRequestId, buildingComponentId } = defaultValues || {};

  const router = useRouter();
  const { formMutation, formQuery } = usePrismaForm({
    ...SearchRequestInterestCreateResource,
    defaultValues: {
      buildingComponent: {
        id: buildingComponentId,
      },
      searchRequest: {
        id: searchRequestId,
      },
    },
    onClose: () => router.back(),
  });

  return (
    <Base style={style} className={className}>
      <SearchRequestInterestBreadcrumb create />
      <FormWithBottom>
        <WaitForFormQuery queryInfo={formQuery}>
          <SearchRequestInterestForm form={formMutation.form} />
        </WaitForFormQuery>
        <GenericGraphQLErrorAlert error={formMutation.error} />
      </FormWithBottom>
      <Divider />
      <FormFooter schemaForm={formMutation} justifyRow="start" stick />
    </Base>
  );
};
