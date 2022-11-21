/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';
import Utterances from 'utterances-react';

const Comments = () => {
  const [colorMode] = useColorMode();

  return (
    <Utterances
      repo="ummahusla/edvins-io"
      issueTerm="pathname"
      theme={colorMode === 'dark' ? 'github-dark' : 'github-light'}
      crossorigin="anonymous"
      async={false}
      style={`
      & .utterances {
        max-width: 950px;
      }
    `}
    />
  );
};

export default Comments;
