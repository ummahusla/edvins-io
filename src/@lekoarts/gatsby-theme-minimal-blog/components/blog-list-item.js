/** @jsx jsx */
import React from 'react';
import { jsx, Link as TLink } from 'theme-ui';
import { Box } from '@theme-ui/components';
import { Link } from 'gatsby';
import ItemTags from '@lekoarts/gatsby-theme-minimal-blog/src/components/item-tags';

import { formatToUniversalDate } from '../../../utils/formatToUniversalDate';

const BlogListItem = ({ post, showTags = true }) => (
  <Box mb={4}>
    <TLink as={Link} to={post.slug} sx={{ fontSize: [1, 2, 3], color: `text` }}>
      {post.title}
    </TLink>
    <p sx={{ color: `secondary`, mt: 1, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
      <time>{formatToUniversalDate(post.date)}</time>
      {post.tags && showTags && (
        <React.Fragment>
          {` — `}
          <ItemTags tags={post.tags} />
        </React.Fragment>
      )}
    </p>
  </Box>
);

export default BlogListItem;
