import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from '../../fields/slug'
import { revalidateCategory, revalidateCategoryDelete } from './hooks/revalidateCategory'
export const ProductCategories: CollectionConfig = {
    slug: 'product-categories',
    labels: {
        singular: 'Product Category',
        plural: 'Product Categories',
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'updatedAt'],
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
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true
        },
    ],
    hooks: {
        afterChange: [revalidateCategory],
        afterDelete: [revalidateCategoryDelete],
    },
}
