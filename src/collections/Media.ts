import type { CollectionConfig } from 'payload';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import sharp from 'sharp';

//
// ➊ Initialize your R2/S3 client (same as your s3Storage plugin config)
//
const r2 = new S3Client({
  region:   'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId:     process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET!,
  },
});

const recompress = async ({ file }: { file: any }) => {
  // Only images
  if (!file?.mimeType?.startsWith('image/')) return;

  // Download the just-uploaded file
  const buffer: Buffer = await file.toBuffer();

  // Convert to WebP @ 75% quality
  const webpBuffer = await sharp(buffer)
    .webp({ quality: 75 })
    .toBuffer();

  // Overwrite in R2
  await r2.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key:    file.filename,       // exact same path/key
    Body:   webpBuffer,
    ContentType: 'image/webp',
    ACL:    'public-read',
  }));
};

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'hero',             width: 1920, height: 750, fit: 'cover' },
      { name: 'masthead',         width: 1920, height: 300, fit: 'cover' },
      { name: 'productThumbnail', width: 390,  height: 500, fit: 'cover' },
      { name: 'categoryBanner',   width: 992,  height: 325, fit: 'cover' },
      { name: 'banner',           width: 1920, height: 900, fit: 'cover' },
      { name: 'galleryTextBanner',width: 330,  height: 480, fit: 'cover' },
      { name: 'galleryThumbnail', width: 820,  height: 615, fit: 'cover' },
      { name: 'galleryFullThumbnail', width: 1680, height: 640, fit: 'cover' },
      { name: 'modalPreview',     width: 1440, height: 1100, fit: 'cover' },
    ],
    mimeTypes: ['image/*'],
    // @ts-ignore
    hooks: {
      afterUpload: [recompress],
    },
  },
};
