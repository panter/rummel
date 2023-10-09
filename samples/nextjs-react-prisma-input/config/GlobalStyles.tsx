import React from 'react';
import { createGlobalStyle, css } from 'styled-components';
import { Reset } from 'styled-reset';
// import { Normalize } from 'styled-normalize';  // TODO: disscuss with cro about reset x normalize

const BaseStyles = css`
  body {
    /* font-family: 'Open Sans', sans-serif;
    font-size: 16px; */
    color: #363636;
    background-color: rgb(245, 247, 248);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    margin: 0;
  }

  body,
  #__next {
    height: 100%;
  }

  a {
    color: #333333;
    text-decoration: none;
  }

  .sr-only {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    white-space: nowrap;
    clip-path: inset(100%);
  }
`;

const Styles = createGlobalStyle`
  ${BaseStyles}
`;

// eslint-disable-next-line react/display-name
export default React.memo(() => (
  <>
    <Reset />
    <Styles />
  </>
));
