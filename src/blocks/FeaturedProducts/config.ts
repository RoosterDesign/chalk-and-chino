import sectionHeader from '@/fields/sectionHeader'
import { Block } from 'payload'

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
