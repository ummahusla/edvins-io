/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';
import { Flex } from '@theme-ui/components';
import useMinimalBlogConfig from '@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config';
import ColorModeToggle from '@lekoarts/gatsby-theme-minimal-blog/src/components/colormode-toggle';
import Navigation from '@lekoarts/gatsby-theme-minimal-blog/src/components/navigation';
import HeaderTitle from '@lekoarts/gatsby-theme-minimal-blog/src/components/header-title';
import HeaderExternalLinks from '@lekoarts/gatsby-theme-minimal-blog/src/components/header-external-links';

const Header = () => {
  const { navigation: nav } = useMinimalBlogConfig();

  const [colorMode, setColorMode] = useColorMode();

  const isDark = colorMode === `dark`;

  const toggleColorMode = (e) => {
    e.preventDefault();
    setColorMode(isDark ? `light` : `dark`);
  };

  return (
    <header sx={{ mb: [5, 6] }}>
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between` }}>
        <HeaderTitle />
        <ColorModeToggle isDark={isDark} toggle={toggleColorMode} />
      </Flex>

      <div
        sx={{
          boxSizing: `border-box`,
          display: `flex`,
          variant: `dividers.bottom`,
          alignItems: `center`,
          justifyContent: `space-between`,
          mt: 3,
          color: `secondary`,
          a: { color: `secondary`, ':hover': { color: `heading` } },
          flexFlow: `wrap`,
        }}
      >
        <Navigation nav={nav} />

        <HeaderExternalLinks />
      </div>
    </header>
  );
};

export default Header;
