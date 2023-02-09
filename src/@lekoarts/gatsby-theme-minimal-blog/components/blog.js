/** @jsx jsx */
import { useState } from 'react';
import { jsx, Styled } from 'theme-ui';
import { Flex, Input } from '@theme-ui/components';
import SEO from '@lekoarts/gatsby-theme-minimal-blog/src/components/seo';

import usePostTags from '../../../hooks/use-post-tags';
import ListingByYear from './listing-by-year';
import TagsList from './tags-list';
import Layout from './layout';

const Blog = ({ posts }) => {
  // get a list of all post tags
  const tags = usePostTags();

  // search state
  const [searchQuery, setSearchQuery] = useState('');

  // filter posts by search query
  const filteredPosts = posts.filter((post) => {
    // search in title
    const postTitle = post.title.toLowerCase();

    // returns an array with filtered posts based on the provided search query
    // for cases when search query is empty - returns all posts
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

      <ListingByYear sx={{ mt: [4, 5] }} posts={filteredPosts} searchQuery={searchQuery} />
    </Layout>
  );
};

export default Blog;
