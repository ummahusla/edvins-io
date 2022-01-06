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
  const ICON_SIZE = 30;
  const ICON_STROKE_WIDTH = 1.5;
  const TWITTER_HANDLE = 'edvinsantonovs';

  return (
    <div className="post-meta-share-icons">
      <FacebookShareButton url={url}>
        <Facebook size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
      </FacebookShareButton>

      <LinkedinShareButton url={url}>
        <Linkedin size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
      </LinkedinShareButton>

      <TwitterShareButton url={url} via={TWITTER_HANDLE}>
        <Twitter size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
      </TwitterShareButton>

      <PocketShareButton url={url}>
        <Pocket size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
      </PocketShareButton>
    </div>
  );
};

export default ShareButtons;
