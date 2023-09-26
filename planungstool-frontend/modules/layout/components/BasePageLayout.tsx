import { BasePageContent } from './BasePageContent';
import { Container } from './Layouts';
import { Header } from './Header';
import { LoginOverlay } from '../../auth/components/LoginOverlay';
import React from 'react';

export const BasePageLayout: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <LoginOverlay>
      <Container className={className}>
        <Header />
        <BasePageContent>{children}</BasePageContent>
      </Container>
    </LoginOverlay>
  );
};
