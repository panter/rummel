import React from 'react';
import styled from 'styled-components';
import { Container } from './Layouts';

const BasePageContent = styled.div`
  height: 100%;
`;

export const BasePageLayout: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <Container className={className}>
      <BasePageContent>{children}</BasePageContent>
    </Container>
  );
};
