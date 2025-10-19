import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getPage } from 'app/utils/pages';
import { generatePageMetadata } from 'app/utils/metadata';

export const metadata = generatePageMetadata({
  title: 'Self-Education',
  description: 'My learning journey and self-education resources.',
  path: '/self-education',
});

export default function SelfEducationPage() {
  const page = getPage('self-education');

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
