/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Volume2, Volume } from 'react-feather';

const SoundToggle = ({ soundMode, toggleSoundMode }) => {
  const ICON_SIZE = 30;

  return (
    <div
      sx={{
        opacity: 0.65,
        position: `relative`,
        borderRadius: `5px`,
        width: `40px`,
        height: `25px`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        border: `none`,
        outline: `none`,
        background: `none`,
        cursor: `pointer`,
        padding: 0,
        appearance: `none`,
        marginRight: `10px`,
        '&:hover, &:focus': { opacity: 1 },
      }}
      onClick={toggleSoundMode}
    >
      {soundMode ? <Volume2 className="jiggle" size={ICON_SIZE} /> : <Volume size={ICON_SIZE} />}
    </div>
  );
};

export default SoundToggle;
