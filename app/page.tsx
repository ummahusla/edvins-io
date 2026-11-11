import { readFileSync } from 'fs';
import { join } from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogPosts } from 'app/components/posts';
import { ProjectsList } from 'app/components/projects/ProjectsList';
import { interactiveRowClassName } from 'app/components/ui/interactive-row';
import { cn } from 'app/lib/utils';
import { getBlogPosts, sortPostsByDate } from 'app/(pages)/blog/utils';
import devClubPhoto from '../public/devclub-frontend-engineering.jpg';

const featuredWriting = [
  {
    slug: 'we-built-an-agent-workflow-app-in-24-hours-and-got-top-5-at-cursor-riga-hackathon',
    description:
      'How our team built Routine, a desktop app that turns a chat with an agent into a runnable automation.',
  },
  {
    slug: 'building-automated-patreon-subscription-sync-with-supabase',
    description:
      'How I automated access for Patreon supporters with OAuth, Edge Functions and a daily sync.',
  },
];

function getProjects() {
  const projectsPath = join(process.cwd(), 'content', 'projects.json');
  return JSON.parse(readFileSync(projectsPath, 'utf8'));
}

export default function Page() {
  const projects = getProjects();
  const posts = sortPostsByDate(getBlogPosts());
  const featuredPosts = featuredWriting.flatMap(({ slug, description }) => {
    const post = posts.find((post) => post.slug === slug);
    return post ? [{ slug, title: post.metadata.title, description }] : [];
  });
  const latestPosts = posts
    .filter((post) => !featuredPosts.some((featured) => featured.slug === post.slug))
    .slice(0, 5);

  return (
    <section>
      <div className="grid items-start gap-6 sm:grid-cols-[minmax(0,1fr)_11rem]">
        <div>
          <h1 className="mb-6 text-2xl font-semibold tracking-tighter">Edvins Antonovs</h1>
          <p className="mb-4">
            Senior Front-End Engineer specialising in React, TypeScript, frontend architecture,
            design systems, developer experience, and product engineering.
          </p>
          <p>
            Based in 🇱🇻 Riga, Latvia. I build{' '}
            <a href="/projects" className="underline">
              side projects
            </a>
            ,{' '}
            <a href="/self-education" className="underline">
              explore new stuff
            </a>
            , and{' '}
            <a href="/blog" className="underline">
              write about code
            </a>
            . In my free time, I enjoy{' '}
            <a href="/books" className="underline">
              reading
            </a>
            ,{' '}
            <a
              href="https://www.strava.com/athletes/29502472"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              running
            </a>
            , and spending time with my family.
          </p>
        </div>
        <figure className="mx-auto w-full max-w-sm sm:w-44">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={devClubPhoto}
              alt="Edvins Antonovs speaking at DevClub.lv in front of his slides and a seated audience"
              unoptimized
              className="block aspect-[4/5] h-auto w-full origin-[40%_75%] scale-[1.22] object-cover object-[50%_62%] sm:aspect-[5/7]"
            />
          </div>
          <figcaption className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
            <Link
              href="/frontend-engineering-in-the-ai-era"
              className="underline underline-offset-4"
            >
              My DevClub.lv talk (2026)
            </Link>
          </figcaption>
        </figure>
      </div>

      <section aria-labelledby="featured-writings" className="my-12">
        <h2 id="featured-writings" className="mb-3 text-lg font-semibold tracking-tight">
          Featured Writings
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {featuredPosts.map(({ slug, title, description }) => (
            <li key={slug}>
              <Link
                href={`/${slug}`}
                aria-labelledby={`featured-${slug}`}
                className={cn(
                  interactiveRowClassName,
                  'block h-full border border-neutral-200 p-4 dark:border-neutral-800'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 id={`featured-${slug}`} className="font-semibold leading-snug">
                    {title}
                  </h3>
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 dark:text-neutral-400"
                  />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="latest-writing" className="my-12">
        <div className="flex items-center justify-between mb-2">
          <h2 id="latest-writing" className="text-lg font-semibold tracking-tight">
            Latest Writing
          </h2>
          <a href="/blog" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">
            View all
          </a>
        </div>
        <BlogPosts posts={latestPosts} />
      </section>
      <div className="my-16">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
          <a href="/projects" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            View all
          </a>
        </div>
        <ProjectsList projects={projects} compact />
      </div>
    </section>
  );
}
