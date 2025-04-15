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
    defaultPopulate: {
        title: true,
        slug: true,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'updatedAt'],
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'pages',
                data,
            }),

        livePreview: {
            url: ({ data, req }) => {
                return generatePreviewPath({
                    slug: typeof data?.slug === 'string' ? data.slug : '',
                    collection: 'pages',
                    data,
                })
            },
        },
        // livePreview: {
        //     url: ({ data, req }) => {
        //         const path = generatePreviewPath({
        //             slug: typeof data?.slug === 'string' ? data.slug : '',
        //             collection: 'pages',
        //             req,
        //         })

        //         return path
        //     },
        // },
        // preview: (data, { req }) =>
        //     generatePreviewPath({
        //         slug: typeof data?.slug === 'string' ? data.slug : '',
        //         collection: 'pages',
        //         req,
        //     }),
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
                interval: 100,
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },

}
