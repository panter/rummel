import { Breadcrumb as AntBreadCrump } from 'antd';
import { isObject } from 'lodash';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import {
  gotoListOfMaterialsDepot,
  gotoMaterialDepotBuildingComponentsList,
  gotoMaterialsDepot,
} from '../../../lib/locations';

const Breadcrumb = styled(AntBreadCrump)`
  margin-bottom: 24px;
`;

type MaterialsDepotBreadcrumpProps = {
  style?: React.CSSProperties;
  className?: string;
  materialsDepot?: { id: string; shortName: string } | null;
  create?: boolean;
  images?: boolean;
  buildingComponent?:
    | boolean
    | { id: string; componentId?: string | null }
    | null
    | undefined;
};

export const MaterialsDepotBreadcrump: React.FC<
  MaterialsDepotBreadcrumpProps
> = ({
  style,
  className,
  materialsDepot,
  buildingComponent,
  create,
  images,
}) => {
  const { t } = useTranslation();

  const items = [
    {
      title: (
        <Link {...gotoListOfMaterialsDepot()}>
          {t('common:materials-depot.breadcrump.materialsDepots')}
        </Link>
      ),
    },
  ];
  const linkMaterialsDepot =
    (materialsDepot && buildingComponent) || (materialsDepot && images);
  const linkBuildingComponentsList = isObject(buildingComponent) || create;
  if (materialsDepot) {
    items.push({
      title: linkMaterialsDepot ? (
        <Link {...gotoMaterialsDepot(materialsDepot.id)}>
          {materialsDepot.shortName}
        </Link>
      ) : (
        <>{materialsDepot.shortName}</>
      ),
    });
  }

  if (buildingComponent && materialsDepot) {
    items.push({
      title: linkBuildingComponentsList ? (
        <Link {...gotoMaterialDepotBuildingComponentsList(materialsDepot.id)}>
          {t('common:materials-depot.breadcrump.buildingComponents')}
        </Link>
      ) : (
        <>{t('common:materials-depot.breadcrump.buildingComponents')}</>
      ),
    });
    if (isObject(buildingComponent)) {
      items.push({
        title: <>{buildingComponent.componentId || '...'}</>,
      });
    }
  }

  if (create) {
    if (!materialsDepot) {
      items.push({
        title: (
          <>{t('common:materials-depot.breadcrump.materialsDepotCreate')}</>
        ),
      });
    } else {
      items.push({
        title: (
          <>{t('common:materials-depot.breadcrump.buildingComponentCreate')}</>
        ),
      });
    }
  }

  if (images && materialsDepot) {
    items.push({
      title: <>{t('common:materials-depot.breadcrump.images')}</>,
    });
  }

  return <Breadcrumb style={style} className={className} items={items} />;
};
