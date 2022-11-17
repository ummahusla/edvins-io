/** @jsx jsx */
import { jsx } from 'theme-ui';
import Title from '@lekoarts/gatsby-theme-minimal-blog/src/components/title';

const SubscribeForm = () => (
  <div
    sx={{
      mt: 5,
    }}
  >
    <Title text="Subscribe to the newsletter" />

    <p
      sx={{
        color: `secondary`,
        mt: 1,
        fontSize: [1, 1, 2],
      }}
    >
      Get emails from me about web development, tech and entrepreneurship.
    </p>

    <div id="revue-embed">
      <form
        className="revue-embed-form"
        action="https://www.getrevue.co/profile/edvins/add_subscriber"
        method="post"
        id="revue-form"
        name="revue-form"
        target="_blank"
      >
        <div className="revue-form-group">
          <label
            sx={{
              color: `text`,
              mt: 1,
              fontSize: [1, 1, 2],
            }}
            htmlFor="member_first_name"
          >
            First name
          </label>

          <input
            className="revue-form-field"
            placeholder="Elon"
            type="text"
            name="member[first_name]"
            id="member_first_name"
            sx={{
              color: `secondary`,
              fontSize: [1],
            }}
          />
        </div>

        <div className="revue-form-group">
          <label
            sx={{
              color: `text`,
              mt: 1,
              fontSize: [1, 1, 2],
            }}
            htmlFor="member_email"
          >
            Email
          </label>

          <input
            className="revue-form-field"
            placeholder="elon@tesla.com"
            type="email"
            name="member[email]"
            id="member_email"
            sx={{
              color: `secondary`,
              fontSize: [1],
            }}
          />
        </div>

        <div className="revue-form-actions">
          <input
            type="submit"
            value="Subscribe"
            className="revue-form-submit"
            name="member[subscribe]"
            id="member_submit"
            sx={{
              color: `heading`,
              mt: 1,
              fontSize: [1],
            }}
          />
        </div>
      </form>
    </div>
  </div>
);

export default SubscribeForm;
