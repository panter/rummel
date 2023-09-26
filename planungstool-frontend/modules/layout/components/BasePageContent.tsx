import { CSSProperties } from 'react';
import styled from 'styled-components';

export type BasePageContentProps = {
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

const Base = styled.div`
  height: 100%;
`;

export const BasePageContent: React.FC<BasePageContentProps> = ({
  style,
  className,
  children,
}) => {
  return (
    <Base style={style} className={className}>
      {children}
    </Base>
  );
};
