import { BlogPosts } from 'app/components/posts';

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Edvins Antonovs</h1>
      <p className="mb-4">
        I'm a front-end engineer at{' '}
        <a
          href="https://secondmind.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Secondmind
        </a>
        , currently based in 🇱🇻 Riga, Latvia. I build{' '}
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
        <BlogPosts displayCount={5} />
      </div>
    </section>
  );
}
