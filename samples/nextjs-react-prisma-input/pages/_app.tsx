import '../lib/i18n';
import '../styles/fonts.css';
import '../utils/date';

import {
  ApplicationThemeProvider,
  antDesignTheme,
} from '../modules/layout/components/StyleComponentThemeProvider';
import React, { ReactNode, useEffect, useState } from 'react';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { BasePageLayout } from '../modules/layout/components/BasePageLayout';
import { ConfigProvider } from 'antd';
import GlobalStyles from '../config/GlobalStyles';
import { apolloClient } from '../lib/apollo-client';
import { appWithTranslation } from 'next-i18next';

type LayoutRendererType = 'default';

const layoutRenderers: Record<LayoutRendererType, (p: ReactNode) => ReactNode> =
  {
    default: (p: ReactNode) => <BasePageLayout>{p}</BasePageLayout>,
  };

const getPageRenderer = (layout: LayoutRendererType) => {
  return layoutRenderers[layout || 'default'];
};

function App({
  Component,
  pageProps,
}: AppProps<{ layout: LayoutRendererType }>) {
  const getBasePageLayout = getPageRenderer(pageProps.layout);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (typeof window !== 'undefined') {
    window.onload = () => {
      document.getElementById('holderStyle')!.remove();
    };
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ConfigProvider
        theme={{
          token: antDesignTheme,
        }}
      >
        <style
          id="holderStyle"
          dangerouslySetInnerHTML={{
            __html: `
                    *, *::before, *::after {
                        transition: none!important;
                    }
                    `,
          }}
        />
        <ApplicationThemeProvider>
          <GlobalStyles />
          <div style={{ visibility: !mounted ? 'hidden' : 'visible' }}>
            {getBasePageLayout(<Component {...pageProps} />)}
          </div>
        </ApplicationThemeProvider>
      </ConfigProvider>
    </ApolloProvider>
  );
}

export default appWithTranslation(App);
