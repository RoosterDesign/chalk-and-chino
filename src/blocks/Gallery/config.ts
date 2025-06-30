import sectionHeader from '@/fields/sectionHeader'
import { Block } from 'payload'

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
