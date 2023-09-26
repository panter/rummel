import React from 'react';
import styled from 'styled-components';
import { CategoryBreadcrumb } from './CategoryBreadcrump';
import { CategoryTable } from './CategoryTable';

type CategoryTableContainerProps = {
  style?: React.CSSProperties;
  className?: string;
};

const Base = styled.div``;

export const CategoryTableContainer: React.FC<CategoryTableContainerProps> = ({
  style,
  className,
}) => {
  return (
    <Base style={style} className={className}>
      <CategoryBreadcrumb />
      <CategoryTable />
    </Base>
  );
};
