import Link from 'next/link';
import Image from 'next/image';
import { Badge } from 'app/components/ui/badge';
import { ExternalLink } from 'lucide-react';

export interface Project {
  name: string;
  status: string;
  description: string;
  tags: string[];
  link: string;
  year: number;
  logo?: string;
}

interface ProjectsListProps {
  projects: Project[];
}

// Only show these specific projects
const DISPLAYED_PROJECTS = [
  'Keystorm',
  'Albion Online Grind',
  'Cultivate',
  'My Digital Garden',
  'Stealth Labs'
];

function filterDisplayedProjects(projects: Project[]): Project[] {
  return projects.filter(project => DISPLAYED_PROJECTS.includes(project.name));
}

const statusVariant: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  'Beta': 'outline',
  'Launched': 'outline',
  'Abandoned': 'outline',
  'In Development': 'outline',
};

export function ProjectsList({ projects }: ProjectsListProps) {
  const displayedProjects = filterDisplayedProjects(projects);

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-medium tracking-tight mb-6 mt-6">2023 — Present</h3>
        <div className="space-y-1">
          {displayedProjects.map((project) => {
          const isExternalLink = project.link.startsWith('http');
          const logoUrl = project.logo ? `/projects/${project.logo}` : null;
          const statusType = project.status as keyof typeof statusVariant;
          const variant = statusVariant[statusType] || 'secondary';

          return (
            <Link
              key={project.name}
              href={project.link}
              target={isExternalLink ? '_blank' : undefined}
              rel={isExternalLink ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black overflow-hidden">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={project.name}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-neutral-100 dark:bg-neutral-800" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline underline-offset-4 truncate">
                    {project.name}
                  </span>
                  <Badge variant={variant} className="text-[10px] px-1.5 py-0 shrink-0 font-normal border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400">
                    {project.status}
                  </Badge>
                  {isExternalLink && (
                    <ExternalLink className="h-3 w-3 text-neutral-500 dark:text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 shrink-0" />
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1 mt-0.5">
                  {project.description}
                </p>
              </div>
            </Link>
          );
          })}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-medium tracking-tight mb-6 mt-6">2014 — 2023</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          One day I will make a detailed post about my projects and the lessons I've learned from them.
        </p>
      </div>
    </div>
  );
}

