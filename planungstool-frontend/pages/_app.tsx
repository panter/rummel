import '../lib/i18n';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../styles/fonts.css';
import '../utils/date';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import React, { ReactNode, useEffect, useState } from 'react';
// import GlobalStyles from '../config/GlobalStyles';
import { ConfigProvider } from 'antd';
import { appWithTranslation } from 'next-i18next';
import GlobalStyles from '../config/GlobalStyles';
import { apolloClient } from '../lib/apollo-client';
import {
  antDesignTheme,
  ApplicationThemeProvider,
} from '../modules/layout/components/StyleComponentThemeProvider';
import { FluidPageLayout } from '../modules/layout/components/FluidPageLayout';
import { BasePageLayout } from '../modules/layout/components/BasePageLayout';

type LayoutRendererType = 'fluid' | 'default';

const layoutRenderers: Record<LayoutRendererType, (p: ReactNode) => ReactNode> =
  {
    fluid: (p: ReactNode) => <FluidPageLayout>{p}</FluidPageLayout>,
    default: (p: ReactNode) => <BasePageLayout>{p}</BasePageLayout>,
  };

const getPageRenderer = (layout: LayoutRendererType) => {
  return layoutRenderers[layout || 'default'];
};

function App({
  Component,
  pageProps,
}: AppProps<{ layout: 'default' | 'fluid' }>) {
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
