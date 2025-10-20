import Link from 'next/link';
import {
  formatDate,
  getBlogPosts,
  sortPostsByDate,
  groupPostsByYear,
} from 'app/(pages)/blog/utils';

export function BlogPosts({
  displayCount = 0,
  groupByYear = false,
}: {
  displayCount?: number;
  groupByYear?: boolean;
}) {
  const allPosts = getBlogPosts();
  const sortedPosts = sortPostsByDate(allPosts);
  const postsToDisplay = displayCount > 0 ? sortedPosts.slice(0, displayCount) : sortedPosts;

  if (groupByYear) {
    const { postsByYear, years } = groupPostsByYear(postsToDisplay);

    return (
      <div>
        {years.map((year) => (
          <div key={year} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{year}</h3>
            {postsByYear[year].map((post) => (
              <Link key={post.slug} className="flex flex-col space-y-1 mb-4" href={`/${post.slug}`}>
                <div className="w-full flex flex-col">
                  <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                    {post.metadata.title}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-500 text-sm">
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
      {postsToDisplay.map((post) => (
        <Link key={post.slug} className="flex flex-col space-y-1 mb-4" href={`/${post.slug}`}>
          <div className="w-full flex flex-col">
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.metadata.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-500 text-sm">
              {formatDate(post.metadata.publishedAt, false)} — {post.metadata.tags?.join(', ')}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
