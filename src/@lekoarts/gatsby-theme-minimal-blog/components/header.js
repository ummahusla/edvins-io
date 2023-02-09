/** @jsx jsx */
import React, { useState } from 'react';
import { jsx, useColorMode } from 'theme-ui';
import { Flex } from '@theme-ui/components';
import useSound from 'use-sound';
import useMinimalBlogConfig from '@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config';
import Navigation from '@lekoarts/gatsby-theme-minimal-blog/src/components/navigation';
import HeaderTitle from '@lekoarts/gatsby-theme-minimal-blog/src/components/header-title';
import HeaderExternalLinks from '@lekoarts/gatsby-theme-minimal-blog/src/components/header-external-links';

import SoundToggle from '../../../components/sound-toggle';
import ColorModeToggle from './colormode-toggle';
import useLocalStorage from '../../../hooks/use-local-storage';
import darkModeSound from '../../../sounds/lightMode.wav';
import lightModeSound from '../../../sounds/darkMode.wav';
import clickSound from '../../../sounds/click.wav';

const Header = () => {
  const { navigation: nav } = useMinimalBlogConfig();

  // Sound icon animation
  const [jiggle, setJiggle] = useState(0);

  // Sound mode
  const [soundMode, setSoundMode] = useLocalStorage('sound-mode', true);
  const [playDarkModeOn] = useSound(darkModeSound, { volume: 0.5 });
  const [playClickSound] = useSound(clickSound, { volume: 2 });
  const [playDarkModeOff] = useSound(lightModeSound, { volume: 0.25 });
  const toggleSoundMode = () => {
    if (!soundMode) {
      // Play sound
      playClickSound();

      // Animate icon
      setJiggle(1);

      setTimeout(() => {
        setJiggle(0);
      }, 1000);
    }
    setSoundMode(!soundMode);
  };

  // Theme mode
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const toggleColorMode = (e) => {
    e.preventDefault();
    if (soundMode) {
      isDark ? playDarkModeOff() : playDarkModeOn();
    }
    setColorMode(isDark ? `light` : `dark`);
  };

  return (
    <header sx={{ mb: [5, 6] }}>
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between` }}>
        <HeaderTitle />

        <div
          sx={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `space-between`,
          }}
        >
          <SoundToggle soundMode={soundMode} toggleSoundMode={toggleSoundMode} jiggle={jiggle} />

          <ColorModeToggle isDark={isDark} toggle={toggleColorMode} />
        </div>
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
