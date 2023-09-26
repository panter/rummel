import { Project, SearchRequest } from '../../../@generated/graphql';
import { gotoProject, gotoProjectSearchRequests } from '../../../lib/locations';

import { Breadcrumb as AntBreadCrump } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

const Breadcrumb = styled(AntBreadCrump)`
  margin-bottom: 24px;
`;

type SearchRequestBreadcrumbProps = {
  style?: React.CSSProperties;
  className?: string;
  project?: Pick<Project, 'id' | 'shortName'> | null;
  searchRequest?: Pick<SearchRequest, 'id'> | null;
  create?: boolean;
};

export const SearchRequestBreadcrumb: React.FC<
  SearchRequestBreadcrumbProps
> = ({ style, className, searchRequest, project, create }) => {
  const { t } = useTranslation();

  const items = [];

  if (project) {
    items.push({
      title: <Link {...gotoProject(project.id)}>{project.shortName}</Link>,
    });
    items.push({
      title: (
        <Link {...gotoProjectSearchRequests(project.id)}>
          {t('common:resources.SearchRequest.breadcrumb.list')}
        </Link>
      ),
    });
  } else {
    items.push({
      title: <>{t('common:resources.SearchRequest.breadcrumb.list')}</>,
    });
  }

  if (searchRequest) {
    items.push({
      title: <>{t('common:common.edit')}</>,
    });
  }

  if (create) {
    items.push({
      title: <>{t('common:resources.SearchRequest.breadcrumb.create')}</>,
    });
  }

  return <Breadcrumb style={style} className={className} items={items} />;
};
