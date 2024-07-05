/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';
import Title from '@lekoarts/gatsby-theme-minimal-blog/src/components/title';
import Listing from '@lekoarts/gatsby-theme-minimal-blog/src/components/listing';
import useMinimalBlogConfig from '@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config';
import replaceSlashes from '@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes';

import Hero from '../texts/hero';
import ProjectListing from '../../../components/project-listing';
import useAllPosts from '../../../hooks/use-all-posts';
import Layout from './layout';
import projects from '../../../data/projects';

const Homepage = () => {
  const { basePath, blogPath } = useMinimalBlogConfig();
  const posts = useAllPosts();

  return (
    <Layout>
      <section sx={{ mb: [5, 6, 7], p: { fontSize: [1, 2, 3], mt: 2 } }}>
        <Hero />
      </section>

      <Title text="Latest Posts">
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>Read all posts</Link>
      </Title>

      <Listing posts={posts} showTags={true} />

      <Title text="Latest Projects">
        <Link to={replaceSlashes(`/${basePath}/projects`)}>View all projects</Link>
      </Title>

      <ProjectListing projects={projects.slice(0, 3)} />
    </Layout>
  );
};

export default Homepage;
