// src/payload/collections/Media.ts
import type { CollectionConfig } from 'payload';

// Every generated size needs its own formatOptions — the upload-level
// formatOptions below only applies to the master file.
const webp = {
  format:  'webp' as const,
  options: { quality: 80 },
};

export const Media: CollectionConfig = {
  slug:   'media',
  access: { read: () => true },

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],

  upload: {
    staticDir: 'media',
    disableLocalStorage: true,

    // Cap the master image so full-resolution originals aren't re-encoded as-is
    resizeOptions: {
      width: 2400,
      withoutEnlargement: true,
    },

    formatOptions: webp,
    imageSizes: [
      {
        name: 'masthead',
        width: 1920,
        height: 300,
        fit: 'cover',
        formatOptions: webp,
      },
      {
        name: 'portrait',
        width: 400,
        height: 500,
        fit: 'cover',
        formatOptions: webp,
      },
      {
        name: 'landscape',
        width: 1920,
        height: 900,
        fit: 'cover',
        formatOptions: webp,
      },
      {
        name: 'categoryBanner',
        width: 990,
        height: 325,
        fit: 'cover',
        formatOptions: webp,
      },
      {
        name: 'thumbnail',
        width: 820,
        height: 615,
        fit: 'cover',
        formatOptions: webp,
      },
      {
        name: 'modalPreview',
        width: 1440,
        height: 1100,
        fit: 'cover',
        formatOptions: webp,
      },
    ],

    // Restrict to images only
    mimeTypes: ['image/*'],
  },
};
