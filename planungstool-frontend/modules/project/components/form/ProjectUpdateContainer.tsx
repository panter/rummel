import { Button, Divider, Space, Tooltip, Upload, UploadProps } from 'antd';
import {
  gotoCreateNewSearchRequestFromProject,
  gotoListOfProjects,
  gotoListOfSearchRequestInterests,
  gotoProjectImages,
  gotoProjectSearchRequests,
} from '../../../../lib/locations';

import { BreadcrumpPanel } from '../../../core/components/PageBreadcrump';
import { BuildingComponentListContainer } from '../../../building-component/components/list/BuildingComponentListContainer';
import { FormFooter } from '../../../forms/components/antd/FormFooter';
import { FormWithBottom } from '../../../forms/components/antd/FormComponents';
import { GenericGraphQLErrorAlert } from '../../../ui/core/components/GenericErrorAlert';
import { ProjectBreadcrump } from '../ProjectBreadcrump';
import { ProjectForm } from './ProjectForm';
import React from 'react';
import { WaitForFormQuery } from '../../../ui/core/components/antd/WaitForQuery';
import styled from 'styled-components';
import { useProjectUpdateForm } from '../../hooks/useProjectForm';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { PictureOutlined, UploadOutlined } from '@ant-design/icons';
import { getUploadProps } from '../../../../utils/upload';

type ProjectUpdateContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  projectId: string;
  searchRequestInterestId?: string;
};

const Base = styled.div``;

export const ProjectUpdateContainer: React.FC<ProjectUpdateContainerProps> = ({
  style,
  className,
  projectId,
  searchRequestInterestId,
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const { formMutation, formQuery } = useProjectUpdateForm(
    projectId,
    (data) => {
      if (!data) {
        router.back();
        return;
      }

      router.push(gotoListOfProjects().href);
    },
  );

  const uploadProps: UploadProps = getUploadProps('search-request', {
    queryParams: {
      projectId: projectId || undefined,
    },
  });

  return (
    <Base style={style} className={className}>
      <BreadcrumpPanel>
        <ProjectBreadcrump project={formQuery.model?.project} />
        <Space>
          <Upload {...uploadProps}>
            <Tooltip
              title={`${t('common:common.import')}
                  ${t('common:resources.SearchRequest.breadcrumb.list')} \n
                  (demnächst)`}
            >
              <Button icon={<UploadOutlined />} disabled />
            </Tooltip>
          </Upload>
          <Link {...gotoProjectImages(projectId)}>
            <Button icon={<PictureOutlined />} />
          </Link>
          <Button
            onClick={() => {
              if (searchRequestInterestId) {
                router.push(gotoListOfSearchRequestInterests().href);
              } else {
                router.push(gotoProjectSearchRequests(projectId).href);
              }
            }}
          >
            {t('common:resources.SearchRequest.breadcrumb.list')}
          </Button>
          <Button
            onClick={() =>
              router.push(gotoCreateNewSearchRequestFromProject(projectId).href)
            }
          >
            {t('common:resources.SearchRequest.breadcrumb.create')}
          </Button>
        </Space>
      </BreadcrumpPanel>
      <FormWithBottom>
        <WaitForFormQuery queryInfo={formQuery}>
          <ProjectForm form={formMutation.form} />
        </WaitForFormQuery>
        <GenericGraphQLErrorAlert error={formMutation.error} />
      </FormWithBottom>
      <Divider>
        {t('common:resources.Project.assignedBuildingComponents')}
      </Divider>
      <BuildingComponentListContainer assignedToProjectId={projectId} />
      <Divider />
      <FormFooter schemaForm={formMutation} justifyRow="start" stick />
    </Base>
  );
};
