/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import SubscribeForm from '../../../components/subscribe-form';

const Footer = () => (
  <React.Fragment>
    <SubscribeForm />

    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `space-between`,
        mt: [6],
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: [`column`, `column`, `row`],
        variant: `dividers.top`,
      }}
    >
      <div>
        &copy; {new Date().getFullYear()} by Edvins Antonovs. All rights reserved.
      </div>
    </footer>
  </React.Fragment>
);

export default Footer;
