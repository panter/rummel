import React from 'react';
import { Divider } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FormWithBottom } from '../../../forms/components/antd/FormComponents';
import { FormFooter } from '../../../forms/components/antd/FormFooter';
import { GenericGraphQLErrorAlert } from '../../../ui/core/components/GenericErrorAlert';
import { WaitForFormQuery } from '../../../ui/core/components/antd/WaitForQuery';
import { SearchRequestForm } from './SearchRequestForm';
import { usePrismaForm } from '../../../ui/form/hooks/usePrismaForms';
import { SearchRequestCreateResource } from '../../resource';
import { SearchRequestBreadcrumb } from '../SearchRequestBreadcrumb';
import { gotoProjectSearchRequests } from '../../../../lib/locations';

type SearchRequestCreateContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  projectId: string;
};

const Base = styled.div``;

export const SearchRequestCreateContainer: React.FC<
  SearchRequestCreateContainerProps
> = ({ style, className, projectId }) => {
  const router = useRouter();
  const { formMutation, formQuery } = usePrismaForm({
    ...SearchRequestCreateResource,
    queryVariables: { projectId },
    defaultValues: {
      projectId: { id: projectId },
    },
    onClose: (data) => {
      if (!data) {
        router.back();
        return;
      }
      router.push(gotoProjectSearchRequests(projectId).href);
    },
  });

  return (
    <Base style={style} className={className}>
      <SearchRequestBreadcrumb create project={formQuery.model?.project} />
      <FormWithBottom>
        <WaitForFormQuery queryInfo={formQuery}>
          <SearchRequestForm form={formMutation.form} />
        </WaitForFormQuery>
        <GenericGraphQLErrorAlert error={formMutation.error} />
      </FormWithBottom>
      <Divider />
      <FormFooter schemaForm={formMutation} justifyRow="start" stick />
    </Base>
  );
};
