/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { Flex } from '@theme-ui/components';
import Layout from '@lekoarts/gatsby-theme-minimal-blog/src/components/layout';
import SEO from '@lekoarts/gatsby-theme-minimal-blog/src/components/seo';

import usePostTags from '../../../hooks/use-post-tags';
import ListingByYear from './listing-by-year';
import TagsList from './tags-list';

const Blog = ({ posts }) => {
  const tags = usePostTags();

  return (
    <Layout>
      <SEO title="Blog" />
      <Flex
        sx={{
          alignItems: `center`,
          justifyContent: `space-between`,
          flexFlow: `wrap`,
        }}
      >
        <Styled.h2>Blog</Styled.h2>
      </Flex>

      <TagsList list={tags} />

      <ListingByYear posts={posts} sx={{ mt: [4, 5] }} />
    </Layout>
  );
};

export default Blog;
