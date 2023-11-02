import { GlobalToken, theme } from 'antd';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { Inter } from 'next/font/google';
import { BREAKPOINTS } from '../../../lib/mediaQuery';

const interFont = Inter({
  subsets: ['latin'],
  weight: ['300'],
});

type ApplicationThemeProviderProps = {
  children: React.ReactNode;
  mounted?: boolean;
};

export const ApplicationThemeProvider: React.FC<
  ApplicationThemeProviderProps
> = ({ children, mounted }) => {
  if (typeof window !== 'undefined') {
    window.onload = () => {
      document.getElementById('holderStyle')!.remove();
    };
  }

  return (
    <ThemeProvider theme={rummelTheme}>
      <div className={interFont.className}>{children}</div>
    </ThemeProvider>
  );
};

export const antDesignTheme: Partial<GlobalToken> = {
  fontFamily: interFont.style.fontFamily,
  colorPrimary: '#4751a9',
  fontSize: 16,
  screenXS: BREAKPOINTS.xs,
  screenXSMin: BREAKPOINTS.xs,
  screenXSMax: BREAKPOINTS.sm - 1,
  screenSM: BREAKPOINTS.sm,
  screenSMMin: BREAKPOINTS.sm,
  screenSMMax: BREAKPOINTS.md - 1,
  screenMD: BREAKPOINTS.md,
  screenMDMin: BREAKPOINTS.md,
  screenMDMax: BREAKPOINTS.lg - 1,
  screenLG: BREAKPOINTS.lg,
  screenLGMin: BREAKPOINTS.lg,
  screenLGMax: BREAKPOINTS.lg,
  screenXL: BREAKPOINTS.lg,
  screenXLMin: BREAKPOINTS.lg,
  screenXLMax: BREAKPOINTS.lg,
  screenXXL: BREAKPOINTS.lg,
  screenXXLMin: BREAKPOINTS.lg,
};

export const rummelTheme: DefaultTheme = {
  antd: {
    ...theme.getDesignToken(),
    ...antDesignTheme,
  },
  pagePaddingSxBottom: 18,
  pagePaddingSxTop: 18,
  pagePaddingSxLeft: 18,
  pagePaddingSxRight: 18,
  pagePaddingSmBottom: 24,
  pagePaddingSmTop: 24,
  pagePaddingSmLeft: 24,
  pagePaddingSmRight: 24,
  pagePaddingMdBottom: 24,
  pagePaddingMdTop: 24,
  pagePaddingMdLeft: 24,
  pagePaddingMdRight: 24,
};
