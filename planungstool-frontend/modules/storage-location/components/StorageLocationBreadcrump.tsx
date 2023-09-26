import { Breadcrumb as AntBreadCrump } from 'antd';
import Link from 'next/link';
import React from 'react';
import { StorageLocation } from '../../../@generated/graphql';
import { gotoListOfStorageLocations } from '../../../lib/locations';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

const Breadcrumb = styled(AntBreadCrump)`
  margin-bottom: 24px;
`;

type StorageLocationBreadcrumbProps = {
  style?: React.CSSProperties;
  className?: string;
  storageLocation?: Pick<StorageLocation, 'id' | 'name'> | null;
  create?: boolean;
  buildingComponents?: boolean;
};

export const StorageLocationBreadcrumb: React.FC<
  StorageLocationBreadcrumbProps
> = ({ style, className, storageLocation, create, buildingComponents }) => {
  const { t } = useTranslation();

  const items = [
    {
      title: (
        <Link {...gotoListOfStorageLocations()}>
          {t('common:resources.StorageLocation.breadcrumb.list')}
        </Link>
      ),
    },
  ];
  if (storageLocation) {
    items.push({
      title: <>{storageLocation.name}</>,
    });
  }
  if (buildingComponents) {
    items.push({
      title: (
        <>
          {t('common:resources.StorageLocation.breadcrumb.buildingComponents')}
        </>
      ),
    });
  }

  if (create) {
    items.push({
      title: <>{t('common:resources.StorageLocation.breadcrumb.create')}</>,
    });
  }

  return <Breadcrumb style={style} className={className} items={items} />;
};
