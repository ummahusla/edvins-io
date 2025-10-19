import fs from 'fs';
import path from 'path';

type PageMetadata = {
  title: string;
  slug: string;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  if (!match) {
    return { metadata: {} as PageMetadata, content: fileContent };
  }

  let frontMatterBlock = match[1];
  let content = fileContent.replace(frontmatterRegex, '').trim();
  let frontMatterLines = frontMatterBlock.trim().split('\n');
  let metadata: Partial<PageMetadata> = {};

  frontMatterLines.forEach((line) => {
    if (line.includes(':')) {
      let [key, ...valueArr] = line.split(':');
      let value = valueArr.join(':').trim();
      value = value.replace(/^['"](.*)['"]$/, '$1');
      metadata[key.trim() as keyof PageMetadata] = value as any;
    }
  });

  return { metadata: metadata as PageMetadata, content };
}

export function getPage(slug: string) {
  const pagePath = path.join(process.cwd(), 'content', 'pages', slug, 'index.mdx');

  if (!fs.existsSync(pagePath)) {
    return null;
  }

  let rawContent = fs.readFileSync(pagePath, 'utf-8');
  return parseFrontmatter(rawContent);
}
