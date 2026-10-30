import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import GoldMineDemo from './demos/GoldMineDemo';
import CultivateDemo from './demos/CultivateDemo';
import Preview from './blog/Preview';
import BlogPost from './blog/BlogPost';
import IdleWelcomeDemo from './demos/IdleWelcomeDemo';
import ChangelogDemo from './demos/ChangelogDemo';
import ActiveVisitorsBadgeDemo from './demos/ActiveVisitorsBadgeDemo';

function MarkdownTable(props: React.ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="table-scroll" role="region" aria-label="Scrollable table" tabIndex={0}>
      <table {...props} />
    </div>
  );
}

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index} scope="col">
      {header}
    </th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <MarkdownTable>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </MarkdownTable>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function YouTubeEmbed({ id, title }) {
  return (
    <div className="my-8 aspect-video overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  Table,
  table: MarkdownTable,
  th: (props: React.ComponentPropsWithoutRef<'th'>) => <th scope="col" {...props} />,
  GoldMineDemo,
  IdleWelcomeDemo,
  CultivateDemo,
  ChangelogDemo,
  ActiveVisitorsBadgeDemo,
  YouTubeEmbed,
  Preview,
  BlogPost,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: {
                  dark: 'github-dark',
                  light: 'github-light',
                },
                keepBackground: false,
              },
            ],
          ],
        },
      }}
    />
  );
}
