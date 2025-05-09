import type { CollectionConfig } from 'payload'

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
            {
                name: 'hero',
                width: 1920,
                height: 750,
                fit: 'cover'
            },
            {
                name: 'masthead',
                width: 1920,
                height: 300,
                fit: 'cover'
            },
            {
                name: 'productHero',
                width: 390,
                height: 500,
                fit: 'cover'
            },
            {
                name: 'productThumbnail',
                width: 390,
                height: 500,
                fit: 'cover'
            },
            {
                name: 'categoryBanner',
                width: 992,
                height: 325,
                fit: 'cover'
            },
            {
                name: 'banner',
                width: 1920,
                height: 900,
                fit: 'cover'
            },
            {
                name: 'galleryTextBanner',
                width: 330,
                height: 480,
                fit: 'cover'
            },
            {
                name: 'galleryThumbnail',
                width: 820,
                height: 615,
                fit: 'cover'
            },
            {
                name: 'galleryFullThumbnail',
                width: 1680,
                height: 640,
                fit: 'cover'
            },
            {
                name: 'galleryCarouselThumbnail',
                width: 560,
                height: 500,
                fit: 'cover'
            },
            {
                name: 'modalPreview',
                width: 1140,
                fit: 'inside'
            },
        ],
        mimeTypes: ['image/*'],
    },
}
