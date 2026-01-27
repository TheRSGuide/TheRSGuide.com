import { ImageResponse } from 'next/og';
import { setup, gettingStarted, guides } from '@/lib/source';
import { readFile } from 'fs/promises';
import { join } from 'path';

const size = {
  width: 1200,
  height: 630,
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;

  // Remove 'image.png' from the end if present
  const cleanSlug = slug.filter(s => s !== 'image.png');

  // Try to find the page in each source
  const page = setup.getPage(cleanSlug)
    || gettingStarted.getPage(cleanSlug)
    || guides.getPage(cleanSlug);

  const title = page?.data.title || 'The RS Guide';
  const description = page?.data.description || 'Your comprehensive guide to RuneScape';

  // Read the logo image from filesystem
  const logoPath = join(process.cwd(), 'public', 'images', 'favicon', 'android-chrome-512x512.png');
  const logoData = await readFile(logoPath);
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#000000',
          padding: 80,
        }}
      >
        {/* Left side - Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 80,
          }}
        >
          <img
            src={logoBase64}
            width={280}
            height={280}
          />
        </div>

        {/* Right side - Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 36,
              color: '#888888',
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>

          {/* Site name */}
          <div
            style={{
              fontSize: 28,
              color: '#666666',
              marginTop: 40,
            }}
          >
            thersguide.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
