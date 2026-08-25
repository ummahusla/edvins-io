import Link from 'next/link';
import Image from 'next/image';
import { Badge } from 'app/components/ui/badge';
import { interactiveRowClassName } from 'app/components/ui/interactive-row';
import { cn } from 'app/lib/utils';
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
  compact?: boolean;
}

// Only show these specific projects
const DISPLAYED_PROJECTS = [
  'Hearthroot Online',
  'Keystorm',
  'Albion Online Grind',
  'Cultivate',
  'My Digital Garden',
  'Stealth Labs'
];

const LANDING_PAGE_EXCLUDED_PROJECTS = ['My Digital Garden'];

function filterDisplayedProjects(projects: Project[]): Project[] {
  return projects.filter(project => DISPLAYED_PROJECTS.includes(project.name));
}

const statusVariant: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  'Beta': 'outline',
  'Launched': 'outline',
  'Archived': 'outline',
  'Development': 'outline',
};

export function ProjectsList({ projects, compact = false }: ProjectsListProps) {
  const displayedProjects = filterDisplayedProjects(projects).filter(
    (project) => !compact || !LANDING_PAGE_EXCLUDED_PROJECTS.includes(project.name)
  );

  const rows = (
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
                className={cn(interactiveRowClassName, 'flex items-center gap-3 px-3 py-3')}
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
                    <Badge variant={variant} className="hidden text-[10px] px-1.5 py-0 shrink-0 font-normal border-neutral-300 text-neutral-600 sm:inline-flex dark:border-neutral-700 dark:text-neutral-400">
                      {project.status}
                    </Badge>
                    {isExternalLink && (
                      <ExternalLink className="h-3 w-3 text-neutral-500 dark:text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 shrink-0" />
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-sm text-neutral-600 sm:line-clamp-1 dark:text-neutral-400">
                    {project.description}
                  </p>
                </div>
              </Link>
            );
          })}
    </div>
  );

  if (compact) {
    return rows;
  }

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-medium tracking-tight mb-6 mt-6">2023 — Present</h3>
        {rows}
      </div>
      <div>
        <h3 className="text-xl font-medium tracking-tight mb-6 mt-6">2014 — 2023</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          A mix of experiments, shipped products, and abandoned ideas built across web, mobile, npm packages, Chrome extensions, and games.
        </p>
      </div>
    </div>
  );
}
