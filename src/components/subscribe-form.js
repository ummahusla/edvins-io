/** @jsx jsx */
import { jsx } from 'theme-ui';
import Title from '@lekoarts/gatsby-theme-minimal-blog/src/components/title';

const SubscribeForm = () => (
  <div
    className="newsletter-form"
    sx={{
      mt: 5,
    }}
  >
    <Title text="Newsletter" />

    <p
      sx={{
        color: `secondary`,
        mt: 1,
        fontSize: [1, 1, 2],
      }}
    >
      Sign up to get updates when I write something new. No spam ever.
    </p>

    <a
      href="https://edvins.substack.com/"
      target="_blank"
      rel="noreferrer"
      className="newsletter-form-submit"
      sx={{
        color: `heading`,
        mt: 1,
        fontSize: [1, 1, 2],
      }}
    >
      Subscribe to my Newsletter
    </a>
  </div>
);

export default SubscribeForm;
