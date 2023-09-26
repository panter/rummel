import { Breadcrumb as AntBreadCrump } from 'antd';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { gotoListOfCategories } from '../../../lib/locations';
import { Category } from '../../../@generated/graphql';

const Breadcrumb = styled(AntBreadCrump)`
  margin-bottom: 24px;
`;

type ProjectBreadcrumbProps = {
  style?: React.CSSProperties;
  className?: string;
  category?: Pick<Category, 'id' | 'name'> | null;
  create?: boolean;
};

export const CategoryBreadcrumb: React.FC<ProjectBreadcrumbProps> = ({
  style,
  className,
  category,
  create,
}) => {
  const { t } = useTranslation();

  const items = [
    {
      title: (
        <Link {...gotoListOfCategories()}>
          {t('common:resources.Category.breadcrumb.list')}
        </Link>
      ),
    },
  ];
  if (category) {
    items.push({
      title: <>{category.name}</>,
    });
  }

  if (create) {
    items.push({
      title: <>{t('common:resources.Category.breadcrumb.create')}</>,
    });
  }

  return <Breadcrumb style={style} className={className} items={items} />;
};
