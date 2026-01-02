'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';

type BlogPost = {
  slug: string;
  title: string;
  publishedAt: string;
  tags: string[];
};

function formatDate(date: string) {
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }

  return new Date(date).toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function groupPostsByYear(posts: BlogPost[]) {
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.publishedAt).getFullYear();
    (acc[year] ??= []).push(post);
    return acc;
  }, {} as Record<number, BlogPost[]>);

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return { postsByYear, years };
}

function tokenize(query: string) {
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

export function BlogPostSearch({
  posts,
  groupByYear = false,
}: {
  posts: BlogPost[];
  groupByYear?: boolean;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredPosts = useMemo(() => {
    const tokens = tokenize(query);
    if (tokens.length === 0) return posts;

    return posts.filter((post) => {
      const searchable = `${post.title} ${(post.tags ?? []).join(' ')}`.toLowerCase();
      return tokens.every((token) => searchable.includes(token));
    });
  }, [posts, query]);

  return (
    <div>
      <div className="mb-8">
        <div className="relative mt-2">
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/40 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-neutral-300 dark:focus-within:ring-neutral-700 ring-offset-2 ring-offset-white dark:ring-offset-black">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 text-neutral-400 dark:text-neutral-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setQuery('');
                  inputRef.current?.blur();
                }
              }}
              placeholder="Search posts…"
              className="min-w-[10ch] flex-1 appearance-none border-0 bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none ring-0 focus:ring-0 focus:outline-none"
              aria-label="Search posts"
            />
          </div>
        </div>

        {query.trim().length > 0 ? (
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Showing {filteredPosts.length} result{filteredPosts.length === 1 ? '' : 's'}.
          </p>
        ) : null}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-sm text-neutral-600 dark:text-neutral-400">No posts match that search.</p>
      ) : groupByYear ? (
        <GroupedPosts posts={filteredPosts} />
      ) : (
        <PostList posts={filteredPosts} />
      )}
    </div>
  );
}

function GroupedPosts({ posts }: { posts: BlogPost[] }) {
  const { postsByYear, years } = useMemo(() => groupPostsByYear(posts), [posts]);

  return (
    <div>
      {years.map((year) => (
        <div key={year} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{year}</h3>
          {postsByYear[year].map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      ))}
    </div>
  );
}

function PostList({ posts }: { posts: BlogPost[] }) {
  return (
    <div>
      {posts.map((post) => (
        <PostRow key={post.slug} post={post} />
      ))}
    </div>
  );
}

function PostRow({ post }: { post: BlogPost }) {
  return (
    <Link key={post.slug} className="flex flex-col space-y-1 mb-4" href={`/${post.slug}`}>
      <div className="w-full flex flex-col">
        <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">{post.title}</p>
        <p className="text-neutral-600 dark:text-neutral-500 text-sm">
          {formatDate(post.publishedAt)} — {post.tags?.join(', ')}
        </p>
      </div>
    </Link>
  );
}
