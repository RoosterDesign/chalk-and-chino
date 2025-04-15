import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from '../../fields/slug'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateProduct, revalidateProductDelete } from './hooks/revalidateProduct'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'categories', 'price', 'updatedAt'],

        preview: (data, { req }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'products',
                data,
            }),

        livePreview: {
            url: ({ data, req }) => {
                return generatePreviewPath({
                    slug: typeof data?.slug === 'string' ? data.slug : '',
                    collection: 'products',
                    data,
                })
            },
        },

        /*
        preview: (doc: any, { req }) => {
            const firstCategory = Array.isArray(doc.categories) ? doc.categories[0] : null

            const categorySlug =
                typeof firstCategory === 'object' && firstCategory?.slug
                    ? firstCategory.slug
                    : 'uncategorised'

            return `${process.env.NEXT_PUBLIC_SITE_URL}/products/${categorySlug}/${doc.slug}`
        },
        livePreview: {
            url: ({ data }: { data: any; req: any }) => {
                const firstCategory = Array.isArray(data?.categories) ? data.categories[0] : null

                const categorySlug =
                    typeof firstCategory === 'object' && firstCategory?.slug
                        ? firstCategory.slug
                        : 'uncategorised'

                return `/products/${categorySlug}/${data?.slug}`
            },
        }
        */

    },
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        ...slugField('name'),
        {
            name: 'categories',
            type: 'relationship',
            relationTo: 'product-categories',
            hasMany: true,
            required: true,
        },
        {
            name: 'price',
            type: 'number',
            required: true,
        },
        {
            name: 'summary',
            type: 'textarea',
        },
        {
            name: 'description',
            type: 'richText',
        },
        {
            name: 'specifications',
            type: 'array',
            label: 'Specifications',
            labels: {
                singular: 'Specification',
                plural: 'Specifications'
            },
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'customPaymentAndDelivery',
            label: 'Custom Payment & Delivery Text',
            type: 'textarea',
            admin: {
                description: 'Optional override. If left blank, the default site-wide text will be used.',
            },
        },

        {
            name: 'heroImage',
            label: 'Main Hero Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },

        {
            name: 'gallery',
            type: 'array',
            label: 'Gallery Images',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'alt',
                    type: 'text',
                    required: false,
                },
            ],
        },
    ],
    hooks: {
        afterChange: [revalidateProduct],
        afterDelete: [revalidateProductDelete],
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
