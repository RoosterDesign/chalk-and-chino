import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
// import {
//     MetaDescriptionField,
//     MetaImageField,
//     MetaTitleField,
//     OverviewField,
//     PreviewField,
// } from '@payloadcms/plugin-seo/fields'
import { HeroBlock } from '../../blocks/Hero/config';
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
export const Pages: CollectionConfig = {
    slug: 'pages',
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    // access: {
    //     read: ({ req }) => {
    //         if (req.user) return true // Admin can read all
    //         return {
    //             _status: {
    //                 equals: 'published',
    //             },
    //         }
    //     }
    // },
    defaultPopulate: {
        title: true,
        slug: true,
    },
    admin: {
        // defaultColumns: ['title', 'slug', 'updatedAt'],
        livePreview: {
            url: ({ data, req }) => {
                const path = generatePreviewPath({
                    slug: typeof data?.slug === 'string' ? data.slug : '',
                    collection: 'pages',
                    req,
                })

                return path
            },
        },
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'pages',
                req,
            }),
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'slug',
            type: 'text',
            required: true
        },
        {
            name: 'layout',
            type: 'blocks',
            required: true,
            blocks: [
                HeroBlock
            ]
        }

    ],
    hooks: {
        afterChange: [revalidatePage],
        afterDelete: [revalidateDelete],
    },
    versions: {
        drafts: {
            autosave: {
                interval: 100, // We set this interval for optimal live preview
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },

}
