import { Metadata } from 'next';
import { baseUrl } from 'app/sitemap';

interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  tags?: string[];
}

export function generatePageMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  tags,
}: PageMetadataProps): Metadata {
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Edvins Antonovs',
      locale: 'en_GB',
      type,
      ...(publishedTime && { publishedTime }),
      ...(tags && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@edvinsantonovs',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
