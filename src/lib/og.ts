import satori, { type SatoriOptions } from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

let fontCache: SatoriOptions['fonts'] | null = null;

async function loadFonts(): Promise<SatoriOptions['fonts']> {
  if (fontCache) return fontCache;

  const geistRegular = readFileSync(
    resolve(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf'),
  );

  const geistBold = readFileSync(
    resolve(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf'),
  );

  const geistMono = readFileSync(
    resolve(process.cwd(), 'node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf'),
  );

  fontCache = [
    {
      name: 'Geist',
      data: geistRegular,
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Geist',
      data: geistBold,
      weight: 700,
      style: 'normal',
    },
    {
      name: 'Geist Mono',
      data: geistMono,
      weight: 400,
      style: 'normal',
    },
  ];

  return fontCache;
}

interface OgOptions {
  title: string;
  subtitle?: string;
  tag?: string;
}

export async function generateOgImage(
  options: OgOptions,
): Promise<Buffer> {
  const fonts = await loadFonts();

  const { title, subtitle, tag } = options;

  const markup = {
    type: 'div',
    props: {
      style: {
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        background: '#0b0b0a',
        padding: '80px 100px',
        position: 'relative',
        fontFamily: 'Geist',
      },
      children: [
        // Top accent line
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: '#e0aa3e',
            },
          },
        },
        // Tag chip (optional)
        ...(tag
          ? [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Geist Mono',
                    fontSize: 18,
                    color: '#e0aa3e',
                    marginBottom: 32,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                  },
                  children: tag,
                },
              } as any,
            ]
          : []),
        // Title
        {
          type: 'div',
          props: {
            style: {
              fontSize: 52,
              fontWeight: 700,
              color: '#f0efec',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              maxWidth: 1000,
              display: 'flex',
              flexWrap: 'wrap',
            },
            children: title,
          },
        },
        // Subtitle
        ...(subtitle
          ? [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 28,
                    color: '#8f8c84',
                    marginTop: 24,
                    maxWidth: 900,
                    lineHeight: 1.4,
                  },
                  children: subtitle,
                },
              } as any,
            ]
          : []),
        // Bottom branding
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: 60,
              left: 100,
              fontFamily: 'Geist Mono',
              fontSize: 20,
              color: '#5a7a9a',
            },
            children: 'Shubham',
          },
        },
      ],
    },
  };

  const svg = await satori(markup as any, {
    width: 1200,
    height: 630,
    fonts,
  });

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}