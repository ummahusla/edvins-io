import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getPage } from 'app/utils/pages';
import { generatePageMetadata } from 'app/utils/metadata';
import { ProjectsList } from 'app/components/projects/ProjectsList';
import { readFileSync } from 'fs';
import { join } from 'path';

export const metadata = generatePageMetadata({
  title: 'Projects',
  description: 'A collection of projects and tools I have created over the years.',
  path: '/projects',
});

function getProjects() {
  const projectsPath = join(process.cwd(), 'content', 'projects.json');
  const fileContents = readFileSync(projectsPath, 'utf8');
  return JSON.parse(fileContents);
}

export default function ProjectsPage() {
  const page = getPage('projects');
  const projects = getProjects();

  if (!page) {
    notFound();
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">{page.metadata.title}</h1>
      <article className="prose mb-12">
        <CustomMDX source={page.content} />
      </article>
      <ProjectsList projects={projects} />
    </section>
  );
}
