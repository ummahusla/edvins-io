import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get('title') || 'Edvins Antonovs';

  const geistRegular = await readFile(join(process.cwd(), 'public', 'fonts', 'Geist-Regular.ttf'));

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-black px-16">
        <div tw="flex flex-col w-full">
          <h1 style={{ fontFamily: 'Geist' }} tw="text-7xl font-bold text-white leading-tight mb-8">
            {title}
          </h1>
          <p style={{ fontFamily: 'Geist' }} tw="text-3xl text-gray-400">
            edvins.io
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: geistRegular,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
