import React from 'react';
import styled from 'styled-components';
import { EbkphCategoryTable } from './EbkphCategoryTable';

type EbkphCategoryTableContainerProps = {
  style?: React.CSSProperties;
  className?: string;
};

const Base = styled.div``;

export const EbkphCategoryTableContainer: React.FC<
  EbkphCategoryTableContainerProps
> = ({ style, className }) => {
  return (
    <Base style={style} className={className}>
      <EbkphCategoryTable />
    </Base>
  );
};
