import { readFileSync } from 'fs';
import { join } from 'path';
import { BlogPosts } from 'app/components/posts';
import { ProjectsList } from 'app/components/projects/ProjectsList';

function getProjects() {
  const projectsPath = join(process.cwd(), 'content', 'projects.json');
  return JSON.parse(readFileSync(projectsPath, 'utf8'));
}

export default function Page() {
  const projects = getProjects();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Edvins Antonovs</h1>
      <p className="mb-4">
        Senior Front-End Engineer specialising in React, TypeScript, frontend architecture, design
        systems, developer experience, and product engineering.
      </p>
      <p className="mb-4">
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

      <div className="my-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold tracking-tight">Writing</h2>
          <a href="/blog" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            View all
          </a>
        </div>
        <BlogPosts displayCount={5} />
      </div>
      <div className="my-8">
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
