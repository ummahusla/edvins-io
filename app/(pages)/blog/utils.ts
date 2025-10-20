import fs from 'fs';
import path from 'path';

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags?: string[];
};

type GatsbyMetadata = {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags?: string[];
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  if (!match) {
    return { metadata: {} as Metadata, content: fileContent };
  }

  let frontMatterBlock = match[1];
  let content = fileContent.replace(frontmatterRegex, '').trim();
  let frontMatterLines = frontMatterBlock.trim().split('\n');
  let metadata: Partial<GatsbyMetadata> = {};
  let currentKey = '';
  let isArray = false;
  let arrayValues: string[] = [];

  frontMatterLines.forEach((line) => {
    // Handle array items (lines starting with '  - ')
    if (line.trim().startsWith('- ') && isArray) {
      arrayValues.push(line.trim().substring(2).trim());
      return;
    }

    // If we were building an array, save it
    if (isArray && currentKey) {
      metadata[currentKey as keyof GatsbyMetadata] = arrayValues as any;
      isArray = false;
      arrayValues = [];
    }

    // Parse key-value pairs
    if (line.includes(':')) {
      let [key, ...valueArr] = line.split(':');
      let value = valueArr.join(':').trim();
      currentKey = key.trim();

      // Check if this is the start of an array
      if (value === '' || value === '[]') {
        isArray = true;
        arrayValues = [];
        return;
      }

      // Regular value
      value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
      metadata[currentKey as keyof GatsbyMetadata] = value as any;
    }
  });

  // Save last array if exists
  if (isArray && currentKey) {
    metadata[currentKey as keyof GatsbyMetadata] = arrayValues as any;
  }

  // Convert Gatsby frontmatter to Next.js format
  const convertedMetadata: Metadata = {
    title: metadata.title || '',
    publishedAt: metadata.date || '',
    summary: metadata.description || '',
    tags: metadata.tags || [],
  };

  return { metadata: convertedMetadata, content };
}

function getPostFolders(dir: string) {
  return fs.readdirSync(dir).filter((file) => {
    const fullPath = path.join(dir, file);
    return fs.statSync(fullPath).isDirectory();
  });
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  let postFolders = getPostFolders(dir);
  return postFolders
    .map((folder) => {
      const mdxPath = path.join(dir, folder, 'index.mdx');

      // Skip if index.mdx doesn't exist
      if (!fs.existsSync(mdxPath)) {
        return null;
      }

      let { metadata, content } = readMDXFile(mdxPath);

      return {
        metadata,
        slug: folder, // Use folder name as slug
        content,
      };
    })
    .filter((post) => post !== null) as Array<{
    tags(tags: string[]): string;
    metadata: Metadata;
    slug: string;
    content: string;
  }>;
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'content', 'posts'));
}

export function sortPostsByDate(posts: ReturnType<typeof getBlogPosts>) {
  return posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });
}

export function groupPostsByYear(posts: ReturnType<typeof getBlogPosts>) {
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.metadata.publishedAt).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<number, typeof posts>);

  // Sort years descending (2025, 2024, 2023...)
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return { postsByYear, years };
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
