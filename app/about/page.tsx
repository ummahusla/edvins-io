import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getPage } from 'app/utils/pages';
import { generatePageMetadata } from 'app/utils/metadata';

export const metadata = generatePageMetadata({
  title: 'About',
  description: 'Edvins Antonovs - about me',
  path: '/about',
});

export default function AboutPage() {
  const page = getPage('about');

  if (!page) {
    notFound();
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">{page.metadata.title}</h1>
      <article className="prose">
        <CustomMDX source={page.content} />
      </article>
    </section>
  );
}
