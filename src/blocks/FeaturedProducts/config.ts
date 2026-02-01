import { Block } from 'payload'

import sectionHeader from '@/fields/sectionHeader'

const FeaturedProductsBlock: Block = {
    slug: 'featuredProducts',
    interfaceName: 'FeaturedProductsBlock',
    fields: [
        sectionHeader,
        {
            name: 'products',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            maxRows: 4,
            admin: {
                description: 'Select up to 4 products. Empty slots are filled with the latest products.',
            },
        },
    ]
}

export default FeaturedProductsBlock;
