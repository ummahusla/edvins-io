import Link from 'next/link';
import { interactiveRowClassName } from 'app/components/ui/interactive-row';
import { cn } from 'app/lib/utils';
import { formatDate, groupPostsByYear, type getBlogPosts } from 'app/(pages)/blog/utils';

export function BlogPosts({
  posts,
  groupByYear = false,
}: {
  posts: ReturnType<typeof getBlogPosts>;
  groupByYear?: boolean;
}) {
  if (groupByYear) {
    const { postsByYear, years } = groupPostsByYear(posts);

    return (
      <div>
        {years.map((year) => (
          <div key={year} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{year}</h3>
            {postsByYear[year].map((post) => (
              <Link
                key={post.slug}
                className={cn(interactiveRowClassName, 'mb-1 flex flex-col space-y-1 px-3 py-2')}
                href={`/${post.slug}`}
              >
                <div className="w-full flex flex-col">
                  <p className="text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:underline underline-offset-4">
                    {post.metadata.title}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {formatDate(post.metadata.publishedAt, false)} —{' '}
                    {post.metadata.tags?.join(', ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <Link
          key={post.slug}
          className={cn(interactiveRowClassName, 'mb-1 flex flex-col space-y-1 px-3 py-2')}
          href={`/${post.slug}`}
        >
          <div className="w-full flex flex-col">
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:underline underline-offset-4">
              {post.metadata.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {formatDate(post.metadata.publishedAt, false)} — {post.metadata.tags?.join(', ')}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
