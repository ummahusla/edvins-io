/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Facebook, Twitter, Linkedin, Pocket } from 'react-feather';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PocketShareButton,
} from 'react-share';

const ShareButtons = ({ url, title, description }) => {
  const strokeWidth = 1.25;
  const twitterHandle = 'edvinsantonovs';

  return (
    <div className="post-meta-share-icons">
      <FacebookShareButton url={url}>
        <Facebook strokeWidth={strokeWidth} />
      </FacebookShareButton>

      <LinkedinShareButton url={url}>
        <Linkedin strokeWidth={strokeWidth} />
      </LinkedinShareButton>

      <TwitterShareButton url={url} via={twitterHandle}>
        <Twitter strokeWidth={strokeWidth} />
      </TwitterShareButton>

      <PocketShareButton url={url}>
        <Pocket strokeWidth={strokeWidth} />
      </PocketShareButton>
    </div>
  );
};

export default ShareButtons;
