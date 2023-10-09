import { CSSProperties, ReactNode } from 'react';

export type ComponentProps = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode | undefined;
};
