// @ts-ignore
import { BaseThemedCssFunction, css, DefaultTheme } from 'styled-components';

export const BREAKPOINTS = {
  xs: 320,
  sm: 600,
  md: 992,
  lg: 1440,
  xl: 2000, // no xl at the moment
  max: 2500,
};

export type MediaQuery = BaseThemedCssFunction<DefaultTheme>;
export type MediaQueries = {
  xs: MediaQuery;
  sm: MediaQuery;
  md: MediaQuery;
  lg: MediaQuery;
  xl: MediaQuery;
};

const calcEmSize = (px: number) => px / 16;

const getEmBreakpoint = (key: keyof typeof BREAKPOINTS) =>
  calcEmSize(BREAKPOINTS[key]);

export const mediaMin = (min: keyof typeof BREAKPOINTS) => {
  return `@media (min-width: ${getEmBreakpoint(min)}em)`;
};

// Subtracting 0.001 is avoid overlap between min and max media queries
// https://stackoverflow.com/questions/13241531/what-are-the-rules-for-css-media-query-overlap
export const mediaMax = (max: keyof typeof BREAKPOINTS) => {
  return `@media (max-width: ${getEmBreakpoint(max) - 0.001}em)`;
};

export const mediaBetween = (
  between: 'xs-sm' | 'sm-md' | 'md-lg' | 'lg-xl',
) => {
  const [min, max] = between.split('-') as [
    keyof typeof BREAKPOINTS,
    keyof typeof BREAKPOINTS,
  ];
  return (
    `@media (min-width: ${getEmBreakpoint(min)}em) ` +
    `and (max-width: ${getEmBreakpoint(max) - 0.001}em)`
  );
};

export const removeAtMediaPrefix = (mediaQuery: string) => {
  return mediaQuery.replace('@media ', '');
};

// Iterate through the sizes and create a media template
export const mediaQueries = Object.keys(BREAKPOINTS).reduce<MediaQueries>(
  (acc, min) => {
    (acc as any)[min] = (first: any, ...args: any[]) => css`
      @media (min-width: ${getEmBreakpoint(
          min as keyof typeof BREAKPOINTS,
        )}em) {
        ${css(first, ...args)}
      }
    `;

    return acc;
  },
  {} as any,
);

export const widthLimiterCSS = css`
  width: 100%;

  max-width: ${calcEmSize(600)}em;

  ${mediaMin('md')} {
    max-width: ${calcEmSize(700)}em;
  }
`;
