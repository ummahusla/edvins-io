/** @jsx jsx */
import React from 'react';
import { Global } from '@emotion/core';
import { Box, Container, jsx } from 'theme-ui';
import 'typeface-ibm-plex-sans';
import SEO from '@lekoarts/gatsby-theme-minimal-blog/src/components/seo';
import CodeStyles from '@lekoarts/gatsby-theme-minimal-blog/src/styles/code';
import SkipNavLink from '@lekoarts/gatsby-theme-minimal-blog/src/components/skip-nav';

import Header from './header';
import Footer from './footer';

const Layout = ({ children, className = `` }) => (
  <>
    <Global
      styles={(theme) => ({
        '*': {
          boxSizing: `inherit`,
        },
        html: {
          WebkitTextSizeAdjust: `100%`,
        },
        img: {
          borderStyle: `none`,
        },
        pre: {
          fontFamily: `monospace`,
          fontSize: `1em`,
        },
        '[hidden]': {
          display: `none`,
        },
        '::selection': {
          backgroundColor: theme.colors.text,
          color: theme.colors.background,
        },
        a: {
          transition: `all 0.3s ease-in-out`,
          color: `text`,
        },
      })}
    />
    <SEO />
    <SkipNavLink>Skip to content</SkipNavLink>
    <Container>
      <Header />
      <Box id="skip-nav" sx={{ ...CodeStyles }} className={className}>
        {children}
      </Box>
      <Footer />
    </Container>
  </>
);

export default Layout;
