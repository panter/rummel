import { BasePageContent } from './BasePageContent';
import { Container } from './Layouts';
import { Header } from './Header';
import React from 'react';

export const BasePageLayout: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <Container className={className}>
      <Header />
      <BasePageContent>{children}</BasePageContent>
    </Container>
  );
};
