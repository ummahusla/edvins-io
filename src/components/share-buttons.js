/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Facebook, Twitter, Linkedin, Pocket } from 'react-feather';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PocketShareButton
} from "react-share";

const ShareButtons = ({ url, title, description }) => {
  const twitterHandle = 'edvinsantonovs';

  return (
    <div className="post-meta-share-icons">
      <FacebookShareButton url={url}>
        <Facebook strokeWidth={1.25} />
      </FacebookShareButton>

      <LinkedinShareButton url={url}>
        <Linkedin strokeWidth={1.25} />
      </LinkedinShareButton>

      <TwitterShareButton url={url} via={twitterHandle}>
        <Twitter strokeWidth={1.25} />
      </TwitterShareButton>

      <PocketShareButton url={url}>
        <Pocket strokeWidth={1.25} />
      </PocketShareButton>
    </div>
  );
}

export default ShareButtons;


