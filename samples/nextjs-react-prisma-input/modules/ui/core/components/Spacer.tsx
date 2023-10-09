import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { mediaQueries } from '../../../core/mediaQuery';

export type SpacerSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const StyledSpacer = styled.div<{ $s: SpacerSizes }>`
  ${(props: { $s: SpacerSizes }) => {
    return css`
      ${mediaQueries.xs`
        min-width: ${spacerSizes[props.$s]['xs']}px;
        min-height: ${spacerSizes[props.$s]['xs']}px;
      `}

      ${mediaQueries.sm`
        min-width: ${spacerSizes[props.$s]['sm']}px;
        min-height: ${spacerSizes[props.$s]['sm']}px;
      `}

      ${mediaQueries.md`
        min-width: ${spacerSizes[props.$s]['md']}px;
        min-height: ${spacerSizes[props.$s]['md']}px;
      `}

      ${mediaQueries.lg`
        min-width: ${spacerSizes[props.$s]['lg']}px;
        min-height: ${spacerSizes[props.$s]['lg']}px;
      `}

      ${mediaQueries.xl`
        min-width: ${spacerSizes[props.$s]['xl']}px;
        min-height: ${spacerSizes[props.$s]['xl']}px;
      `}
    `;
  }};
`;

type SpacerProps = {
  s: SpacerSizes;
  style?: CSSProperties;
};

export const Spacer: React.FC<SpacerProps> = ({ s, style }) => (
  <StyledSpacer $s={s} style={style} />
);

export const spacerSizes: Record<
  SpacerSizes,
  Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>
> = {
  1: {
    xs: 4,
    sm: 4,
    md: 4,
    lg: 4,
    xl: 4,
  },
  2: {
    xs: 8,
    sm: 8,
    md: 8,
    lg: 8,
    xl: 8,
  },
  3: {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  4: {
    xs: 16,
    sm: 16,
    md: 16,
    lg: 16,
    xl: 16,
  },
  5: {
    xs: 20,
    sm: 20,
    md: 20,
    lg: 20,
    xl: 24,
  },
  6: {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 32,
  },
  7: {
    xs: 32,
    sm: 32,
    md: 40,
    lg: 40,
    xl: 48,
  },
  8: {
    xs: 40,
    sm: 40,
    md: 56,
    lg: 56,
    xl: 64,
  },
  9: {
    xs: 56,
    sm: 56,
    md: 72,
    lg: 72,
    xl: 80,
  },
  10: {
    xs: 72,
    sm: 72,
    md: 96,
    lg: 96,
    xl: 112,
  },
};
