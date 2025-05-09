import { Block } from 'payload'

const MastheadBlock: Block = {
    slug: 'masthead',
    interfaceName: 'mastheadBlock',
    fields: [
        {
            name: 'image',
            label: 'Background Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'title',
            type: 'text',
            required: true
        },
    ]
}

export default MastheadBlock
