// src/payload/collections/Media.ts
import type { CollectionConfig } from 'payload';

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

    formatOptions: {
      format:  'webp',
      options: { quality: 90 },
    },
    imageSizes: [
      {
        name: 'masthead',
        width: 1920,
        height: 300,
        fit: 'cover',
        formatOptions: {
          format: 'avif',
          options: { quality: 90 },
        },
      },
      {
        name: 'portrait',
        width: 400,
        height: 500,
        fit: 'cover',
        formatOptions: {
          format: 'avif',
          options: { quality: 90 },
        },
      },
      {
        name: 'landscape',
        width: 1920,
        height: 900,
        fit: 'cover',
        formatOptions: {
          format: 'avif',
          options: { quality: 90 },
        },
      },
      {
        name: 'categoryBanner',
        width: 990,
        height: 325,
        fit: 'cover',
        formatOptions: {
          format: 'avif',
          options: { quality: 90 },
        },
      },
      {
        name: 'thumbnail',
        width: 820,
        height: 615,
        fit: 'cover',
        formatOptions: {
          format: 'avif',
          options: { quality: 90 },
        },
      },
      {
        name: 'modalPreview',
        width: 1440,
        height: 1100,
        fit: 'cover',
        formatOptions: {
          format: 'avif',
          options: { quality: 90 },
        },
      },
    ],

    // Restrict to images only
    mimeTypes: ['image/*'],
  },
};
