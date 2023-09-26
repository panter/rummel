import React from 'react';
import { Button, Divider, Space } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FormWithBottom } from '../../../forms/components/antd/FormComponents';
import { FormFooter } from '../../../forms/components/antd/FormFooter';
import { GenericGraphQLErrorAlert } from '../../../ui/core/components/GenericErrorAlert';
import { WaitForFormQuery } from '../../../ui/core/components/antd/WaitForQuery';
import { usePrismaForm } from '../../../ui/form/hooks/usePrismaForms';
import { SearchRequestUpdateResource } from '../../resource';
import { SearchRequestForm } from './SearchRequestForm';
import { SearchRequestBreadcrumb } from '../SearchRequestBreadcrumb';
import {
  gotoCreateNewSearchRequestInterest,
  gotoListOfSearchRequestInterests,
  gotoProjectSearchRequests,
} from '../../../../lib/locations';
import { t } from 'i18next';
import { BreadcrumpPanel } from '../../../core/components/PageBreadcrump';
import { BuildingComponentListContainer } from '../../../building-component/components/list/BuildingComponentListContainer';

type SearchRequestUpdateContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  projectId: string;
  searchRequestId: string;
};

const Base = styled.div``;

export const SearchRequestUpdateContainer: React.FC<
  SearchRequestUpdateContainerProps
> = ({ style, className, projectId, searchRequestId }) => {
  const router = useRouter();

  const { formMutation, formQuery } = usePrismaForm({
    ...SearchRequestUpdateResource,
    queryVariables: {
      where: { id: searchRequestId },
    },
    onClose: (v) => {
      if (!v) {
        router.back();
        return;
      }
      if (v?.updateOneSearchRequest.project.id) {
        router.push(
          gotoProjectSearchRequests(v.updateOneSearchRequest.project.id).href,
        );
      }
    },
  });

  return (
    <Base style={style} className={className}>
      <BreadcrumpPanel>
        <SearchRequestBreadcrumb
          project={formQuery.model?.searchRequest?.project}
          searchRequest={formQuery.model?.searchRequest}
        />
        <Space>
          <Button
            onClick={() =>
              router.push(
                gotoListOfSearchRequestInterests({
                  searchRequestId,
                }).href,
              )
            }
          >
            {t('common:resources.SearchRequestInterest.breadcrumb.list')}
          </Button>
          <Button
            onClick={() =>
              router.push(
                gotoCreateNewSearchRequestInterest({ searchRequestId }).href,
              )
            }
          >
            {t('common:resources.SearchRequestInterest.breadcrumb.create')}
          </Button>
        </Space>
      </BreadcrumpPanel>
      <FormWithBottom>
        <WaitForFormQuery queryInfo={formQuery}>
          <SearchRequestForm form={formMutation.form} />
        </WaitForFormQuery>
        <GenericGraphQLErrorAlert error={formMutation.error} />
      </FormWithBottom>
      <Divider>
        {t('common:resources.Project.assignedBuildingComponents')}
      </Divider>
      <BuildingComponentListContainer
        assignedSearchRequestId={searchRequestId}
      />
      <Divider />
      <FormFooter schemaForm={formMutation} justifyRow="start" stick />
    </Base>
  );
};
