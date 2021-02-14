/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { Flex } from '@theme-ui/components';
import Layout from '@lekoarts/gatsby-theme-minimal-blog/src/components/layout';
import Listing from '@lekoarts/gatsby-theme-minimal-blog/src/components/listing';
import SEO from '@lekoarts/gatsby-theme-minimal-blog/src/components/seo';

import usePostTags from '../../../hooks/use-post-tags';
import TagsList from './tags-list';

const Tag = ({ posts, pageContext }) => {
  const tags = usePostTags();

  return (
    <Layout>
      <SEO title={`Tag: ${pageContext.name}`} />

      <Flex
        sx={{
          alignItems: `center`,
          justifyContent: `space-between`,
          flexFlow: `wrap`,
        }}
      >
        <Styled.h2>{`Blog: ${pageContext.name}`}</Styled.h2>
      </Flex>

      <TagsList list={tags} />

      <Listing posts={posts} sx={{ mt: [4, 5] }} />
    </Layout>
  );
};

export default Tag;
