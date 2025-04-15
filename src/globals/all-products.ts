import type { GlobalConfig } from 'payload'

export const AllProducts: GlobalConfig = {
    slug: 'all-products',
    label: 'All Products Page/Banner',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            label: 'Page Title',
            type: 'text',
            required: true,
        },
        {
            name: 'image',
            label: 'Category Image',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
    ],
}
