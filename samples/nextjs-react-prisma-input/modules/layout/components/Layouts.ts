import { BREAKPOINTS, mediaQueries } from '../../../lib/mediaQuery';
import styled, { DefaultTheme } from 'styled-components';

export const Container = styled.div`
  background-color: white;
  margin: auto;
  max-width: ${BREAKPOINTS.sm}px;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100%;
  width: 100%;
  padding-top: ${({ theme }) => theme.pagePaddingSxTop}px;
  padding-bottom: ${({ theme }) => theme.pagePaddingSxBottom}px;
  padding-right: ${({ theme }) => theme.pagePaddingSxRight}px;
  padding-left: ${({ theme }) => theme.pagePaddingSxLeft}px;

  ${mediaQueries.sm`
      max-width: ${BREAKPOINTS.sm}px;
      width: ${BREAKPOINTS.sm}px;
      min-width: ${BREAKPOINTS.sm}px;
      padding-top: ${({ theme }: { theme: DefaultTheme }) =>
        theme.pagePaddingSmTop}px;
      padding-bottom: ${({ theme }: { theme: DefaultTheme }) =>
        theme.pagePaddingSmBottom}px;
      padding-right: ${({ theme }: { theme: DefaultTheme }) =>
        theme.pagePaddingSmRight}px;
      padding-left: ${({ theme }: { theme: DefaultTheme }) =>
        theme.pagePaddingSmLeft}px;
    `}

  ${mediaQueries.md`
      max-width: ${BREAKPOINTS.md}px;
      width: ${BREAKPOINTS.md}px;
      min-width: ${BREAKPOINTS.md}px;
      padding-top: ${({ theme }: { theme: DefaultTheme }) =>
        theme.pagePaddingMdTop}px;
      padding-bottom: ${({ theme }: { theme: DefaultTheme }) =>
        theme.pagePaddingMdBottom}px;
      padding-right: ${({ theme }: { theme: DefaultTheme }) =>
        theme.pagePaddingMdRight}px;
      padding-left: ${({ theme }: { theme: DefaultTheme }) =>
        theme.pagePaddingMdLeft}px;
    `} /* ${mediaQueries.lg`
      max-width: ${BREAKPOINTS.lg}px;
      width: ${BREAKPOINTS.lg}px;
      min-width: ${BREAKPOINTS.lg}px;
    `} */
`;
