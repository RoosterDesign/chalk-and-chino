import type { GlobalConfig } from 'payload'

export const AllProductsCategory: GlobalConfig = {
    slug: 'all-products-category',
    label: 'All Products Category',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            label: 'Page Title',
            type: 'text',
            required: false,
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
