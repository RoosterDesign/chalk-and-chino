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
      options: { quality: 80 },
    },
    imageSizes: [
      {
        name: 'hero',
        width: 1920,
        height: 750,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
          options: { quality: 75 },
        },
      },
      {
        name: 'masthead',
        width: 1920,
        height: 300,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
          options: { quality: 75 },
        },
      },
      {
        name: 'productThumbnail',
        width: 390,
        height: 500,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
          options: { quality: 75 },
        },
      },
      {
        name: 'categoryBanner',
        width: 992,
        height: 325,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
          options: { quality: 75 },
        },
      },
      {
        name: 'banner',
        width: 1920,
        height: 900,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
          options: { quality: 75 },
        },
      },
      {
        name: 'galleryTextBanner',
        width: 330,
        height: 480,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
          options: { quality: 75 },
        },
      },
      {
        name: 'galleryThumbnail',
        width: 820,
        height: 615,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
          options: { quality: 75 },
        },
      },
      {
        name: 'galleryFullThumbnail',
        width: 1680,
        height: 640,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
          options: { quality: 75 },
        },
      },
      {
        name: 'modalPreview',
        width: 1440,
        height: 1100,
        fit: 'cover',
        formatOptions: {
          format: 'webp',
          options: { quality: 75 },
        },
      },
    ],

    // Restrict to images only
    mimeTypes: ['image/*'],
  },
};
