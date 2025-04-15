import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/lib/utils/generatePreviewPath'

import { revalidateProduct, revalidateProductDelete } from './hooks/revalidateProduct'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'category', 'price', '_status', 'updatedAt'],
        livePreview: {
            url: ({ data }) => generatePreviewPath({ collection: 'products', data }),
        },
        preview: ({ data }) => generatePreviewPath({
            collection: 'products',
            data: data as { id?: string; slug?: string },
        }),
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
            name: 'category',
            type: 'relationship',
            relationTo: 'product-categories',
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
            name: 'customPaymentDelivery',
            label: 'Custom Payment & Delivery Text',
            type: 'richText',
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
        }
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
