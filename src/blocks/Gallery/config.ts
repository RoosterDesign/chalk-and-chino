import { Block } from 'payload'

import sectionHeader from '@/fields/sectionHeader'

const GalleryBlock: Block = {
    slug: 'gallery',
    interfaceName: 'GalleryBlock',
    fields: [
        sectionHeader,
        {
            name: 'images',
            label: 'Images',
            type: 'upload',
            relationTo: 'media',
            hasMany: true,
            required: true,
        }
    ]
}

export default GalleryBlock
