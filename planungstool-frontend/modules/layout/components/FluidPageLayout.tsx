import { BasePageContent } from './BasePageContent';
import { FluidContainer } from './Layouts';
import { Header } from './Header';
import { LoginOverlay } from '../../auth/components/LoginOverlay';
import React from 'react';

export const FluidPageLayout: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <LoginOverlay>
      <FluidContainer className={className}>
        <Header />
        <BasePageContent>{children}</BasePageContent>
      </FluidContainer>
    </LoginOverlay>
  );
};
