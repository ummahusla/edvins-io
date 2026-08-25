import Link from 'next/link';

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'blog',
  },
  '/about': {
    name: 'about',
  },
  '/projects': {
    name: 'projects',
  },
  '/books': {
    name: 'books',
  },
  '/self-education': {
    name: 'learning',
  },
};

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex flex-row items-start overflow-x-auto px-0 pb-0 scroll-pr-6"
          id="nav"
        >
          <div className="flex flex-row flex-nowrap space-x-0">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="relative my-1 flex px-1 py-1 align-middle transition-all hover:text-neutral-800 sm:m-1 sm:px-2 dark:hover:text-neutral-200"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
