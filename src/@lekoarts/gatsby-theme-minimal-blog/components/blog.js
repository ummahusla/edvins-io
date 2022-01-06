/** @jsx jsx */
import { useState } from 'react';
import { jsx, Styled } from 'theme-ui';
import { Flex, Input } from '@theme-ui/components';
import Layout from '@lekoarts/gatsby-theme-minimal-blog/src/components/layout';
import SEO from '@lekoarts/gatsby-theme-minimal-blog/src/components/seo';

import usePostTags from '../../../hooks/use-post-tags';
import ListingByYear from './listing-by-year';
import TagsList from './tags-list';

const Blog = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const tags = usePostTags();

  const filteredPosts = posts.filter((post) => {
    const postTitle = post.title.toLowerCase();

    return postTitle.includes(searchQuery);
  });

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

      <Input
        name="search"
        mt={4}
        mb={4}
        placeholder="Begin typing to search ..."
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
      />

      <TagsList list={tags} />

      <ListingByYear posts={filteredPosts} sx={{ mt: [4, 5] }} />
    </Layout>
  );
};

export default Blog;
