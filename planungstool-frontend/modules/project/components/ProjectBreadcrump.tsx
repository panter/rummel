import { Breadcrumb as AntBreadCrump } from 'antd';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import {
  gotoListOfMaterialsDepot,
  gotoListOfProjects,
  gotoProject,
} from '../../../lib/locations';

const Breadcrumb = styled(AntBreadCrump)`
  margin-bottom: 24px;
`;

type ProjectBreadcrumpProps = {
  style?: React.CSSProperties;
  className?: string;
  project?: { id: string; shortName: string } | null;
  create?: boolean;
};

export const ProjectBreadcrump: React.FC<ProjectBreadcrumpProps> = ({
  style,
  className,
  project,
  create,
}) => {
  const { t } = useTranslation();

  const items = [
    {
      title: (
        <Link {...gotoListOfProjects()}>
          {t('common:project.breadcrump.projects')}
        </Link>
      ),
    },
  ];
  if (project) {
    items.push({
      title: <>{project.shortName}</>,
    });
  }

  if (create) {
    items.push({
      title: <>{t('common:project.breadcrump.projectCreate')}</>,
    });
  }

  return <Breadcrumb style={style} className={className} items={items} />;
};
