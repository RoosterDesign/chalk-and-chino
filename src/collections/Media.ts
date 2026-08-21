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

    // The crop tool overwrites the original file with the cropped version,
    // which would destroy the full-size image the product modal shows.
    // Focal point achieves the same framing non-destructively: it crops each
    // size to its own ratio around the chosen point, leaving the master intact.
    crop: false,
    focalPoint: true,

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
        // Product hero: a fixed 4:5 portrait frame, matching how most stock is
        // photographed. 'cover' crops to that ratio around the focal point set
        // in the admin, so the editor chooses what survives on a landscape shot.
        //
        // withoutEnlargement must stay false. Set true, Payload skips the crop
        // entirely for any master smaller than the box in either axis, and the
        // derivative keeps the source ratio instead of this one.
        // 720x900 is the 4:5 crop of the most common master here (720x960), so
        // the bulk of the library is framed without being upscaled.
        name: 'thumbnail',
        width: 720,
        height: 900,
        fit: 'cover',
        withoutEnlargement: false,
        formatOptions: webp,
      },
      {
        // Full-size lightbox image - must never be cropped.
        name: 'modalPreview',
        width: 1440,
        height: 1440,
        fit: 'inside',
        withoutEnlargement: true,
        formatOptions: webp,
      },
    ],

    // Restrict to images only
    mimeTypes: ['image/*'],
  },
};
