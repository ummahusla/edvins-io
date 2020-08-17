/** @jsx jsx */
import { jsx } from 'theme-ui';

const Footer = () => (
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
);

export default Footer;
