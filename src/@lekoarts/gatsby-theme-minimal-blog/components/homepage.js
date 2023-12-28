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

const Homepage = () => {
  const { basePath, blogPath } = useMinimalBlogConfig();
  const posts = useAllPosts();

  const projects = [
    {
      name: 'Dungeon Grind',
      status: 'Development',
      description: 'Browser-based RPG game.',
      tags: ['React', 'Next.js', 'Supabase'],
      link: 'https://dungeon-grind.vercel.app/',
    },
    {
      name: 'Albion Online Grind',
      status: 'Launched',
      description:
        "Albion Online Grind is an ultimate source for tools to boost player's efficiency in the Albion Online game.",
      tags: ['React', 'Next.js', 'Chakra UI', 'Supabase'],
      link: 'https://albiononlinegrind.com/',
    },
    {
      name: 'Cultivate',
      status: 'Abandoned',
      description: 'Habit tracking application to cultivate new habits.',
      tags: ['React', 'TypeScript', 'Redux', 'Firebase'],
      link: 'https://cultivate.so/',
    },
    {
      name: "Edvins's Digital Garden",
      status: 'Launched',
      description: 'Personal blog about software development and entrepreneurship.',
      tags: ['React', 'Gatsby', 'GraphQL'],
      link: 'https://edvins.io/',
    },
    {
      name: 'react-simple-card',
      status: 'Launched',
      description: 'Simple, flexible and easy to use Card component written in React.',
      tags: ['Open-Source', 'React'],
      link: 'https://www.npmjs.com/package/react-simple-card',
    },
    {
      name: 'Hustle Market',
      status: 'Abandoned',
      description: 'Marketplace for buying and selling profitable online businesses.',
      tags: ['React', 'Redux', 'Next', 'Firebase'],
      link: 'https://hustle.market/',
    },
    {
      name: 'Kale',
      status: 'Abandoned',
      description: 'Expense tracking bot for Telegram.',
      tags: ['Node', 'Firebase'],
      link: 'https://kale.money/',
    },
    {
      name: 'Stealth Labs',
      status: 'Launched',
      description: 'My umbrella company which I use to work with my clients.',
      tags: ['React', 'Gatsby', 'GraphQL'],
      link: 'https://stealthlabs.io/',
    },
    {
      name: 'gulp-starter',
      status: 'Launched',
      description: 'Gulp starter template for a new project.',
      tags: ['Open-Source', 'Gulp', 'SASS', 'browsersync'],
      link: 'https://github.com/ummahusla/gulp-starter',
    },
    {
      name: 'PotatoCSS',
      status: 'Launched',
      description: 'Simple CSS framework for hackers. Simple as potato.',
      tags: ['Open-Source', 'CSS'],
      link: 'https://potatocss.github.io/',
    },
    {
      name: 'Hacker Hype',
      status: 'Abandoned',
      description: 'Online hackathon platform, unleash your potential.',
      tags: ['react', 'node', 'express', 'mongo'],
      link: 'https://hackerhype.com/',
    },
  ];

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
