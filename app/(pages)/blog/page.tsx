import { getBlogPosts, sortPostsByDate } from './utils';
import { BlogPostSearch } from './post-search';

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
};

export default function Page() {
  const posts = sortPostsByDate(getBlogPosts()).map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    publishedAt: post.metadata.publishedAt,
    tags: post.metadata.tags ?? [],
  }));

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-4 tracking-tighter">Blog</h1>
      <BlogPostSearch posts={posts} groupByYear />
    </section>
  );
}
