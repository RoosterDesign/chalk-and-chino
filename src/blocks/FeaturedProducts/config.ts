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
            required: true
        },
    ]
}

export default FeaturedProductsBlock;
