import {
  gotoListOfBuildingComponents,
  gotoListOfMaterialsDepot,
} from '../../../lib/locations';

import { Breadcrumb as AntBreadCrump } from 'antd';
import Link from 'next/link';
import React from 'react';
import { isObject } from 'lodash';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

const Breadcrumb = styled(AntBreadCrump)`
  margin-bottom: 24px;
`;

type BuildingComponentsBreadcrumpProps = {
  style?: React.CSSProperties;
  className?: string;
  buildingComponent?:
    | boolean
    | { id: string; componentId?: string | null }
    | null
    | undefined;
};

export const BuildingComponentsBreadcrump: React.FC<
  BuildingComponentsBreadcrumpProps
> = ({ style, className, buildingComponent }) => {
  const { t } = useTranslation();

  const items = [
    {
      title: (
        <Link {...gotoListOfBuildingComponents()}>
          {t('common:building-component.breadcrump.buildingComponents')}
        </Link>
      ),
    },
  ];

  if (isObject(buildingComponent)) {
    items.push({
      title: <>{buildingComponent.componentId || '...'}</>,
    });
  }

  return <Breadcrumb style={style} className={className} items={items} />;
};
