import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import React from 'react';
import remarkGfm from 'remark-gfm';
import GoldMineDemo from './demos/GoldMineDemo';
import CultivateDemo from './demos/CultivateDemo';
import Preview from './blog/Preview';
import BlogPost from './blog/BlogPost';
import IdleWelcomeDemo from './demos/IdleWelcomeDemo';
import ChangelogDemo from './demos/ChangelogDemo';

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th
      key={index}
      className="border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-left font-semibold bg-neutral-50 dark:bg-neutral-800"
    >
      {header}
    </th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
      {row.map((cell, cellIndex) => (
        <td key={cellIndex} className="border border-neutral-200 dark:border-neutral-700 px-4 py-2">
          {cell}
        </td>
      ))}
    </tr>
  ));

  return (
    <table className="w-full border-collapse my-6 text-sm">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
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

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
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
  code: Code,
  Table,
  table: (props) => <table className="w-full border-collapse my-6 text-sm" {...props} />,
  th: (props) => (
    <th
      className="border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-left font-semibold bg-neutral-50 dark:bg-neutral-800"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-2" {...props} />
  ),
  tr: (props) => <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50" {...props} />,
  GoldMineDemo,
  IdleWelcomeDemo,
  CultivateDemo,
  ChangelogDemo,
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
        },
      }}
    />
  );
}
