import { Breadcrumb as AntBreadCrump } from 'antd';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import {
  gotoListOfSearchRequestInterests,
  gotoProject,
  gotoProjectSearchRequest,
} from '../../../lib/locations';
import { Project, SearchRequestInterest } from '../../../@generated/graphql';

const Breadcrumb = styled(AntBreadCrump)`
  margin-bottom: 24px;
`;

type SearchRequestInterestProps = {
  style?: React.CSSProperties;
  className?: string;
  searchRequest?:
    | (Pick<SearchRequestInterest, 'id'> & {
        project: Pick<Project, 'id' | 'shortName'>;
      })
    | null;
  searchRequestInterest?: Pick<SearchRequestInterest, 'id'> | null;
  create?: boolean;
};

export const SearchRequestInterestBreadcrumb: React.FC<
  SearchRequestInterestProps
> = ({ style, className, searchRequest, searchRequestInterest, create }) => {
  const { t } = useTranslation();

  const items = [];

  if (searchRequest) {
    items.push({
      title: (
        <Link {...gotoProject(searchRequest.project.id)}>
          {searchRequest.project.shortName}
        </Link>
      ),
    });
    items.push({
      title: (
        <Link
          {...gotoListOfSearchRequestInterests({
            searchRequestId: searchRequest?.id,
          })}
        >
          {t('common:resources.SearchRequestInterest.breadcrumb.one')}
        </Link>
      ),
    });
  }
  items.push({
    title: !searchRequestInterest ? (
      <>{t('common:resources.SearchRequestInterest.breadcrumb.list')}</>
    ) : (
      <Link
        {...gotoListOfSearchRequestInterests({
          searchRequestId: searchRequest?.id,
        })}
      >
        {t('common:resources.SearchRequestInterest.breadcrumb.list')}
      </Link>
    ),
  });

  if (searchRequestInterest) {
    items.push({
      title: <>{t('common:common.edit')}</>,
    });
  }

  if (create) {
    items.push({
      title: (
        <>{t('common:resources.SearchRequestInterest.breadcrumb.create')}</>
      ),
    });
  }

  return <Breadcrumb style={style} className={className} items={items} />;
};
