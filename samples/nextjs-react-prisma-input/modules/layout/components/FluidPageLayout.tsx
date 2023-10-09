import { BasePageContent } from './BasePageContent';
import { FluidContainer } from './Layouts';
import { Header } from './Header';
import React from 'react';

export const FluidPageLayout: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <FluidContainer className={className}>
      <Header />
      <BasePageContent>{children}</BasePageContent>
    </FluidContainer>
  );
};
