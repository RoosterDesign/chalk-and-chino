import { Block } from 'payload'

export const FeaturedProductsBlock: Block = {
    slug: 'featuredProducts',
    interfaceName: 'FeaturedProductsBlock',
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'Featured Products',
            required: false
        },
        {
            name: 'products',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            maxRows: 4,
            required: true
        },
        {
            name: 'link',
            label: 'View All Link',
            type: 'group',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    defaultValue: 'View all',
                    required: true
                },
                {
                    name: 'url',
                    type: 'text',
                    defaultValue: '/products',
                    required: true
                },
            ]
        }
    ]
}
