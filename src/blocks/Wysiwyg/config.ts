import { Block } from 'payload'

const Wysiwyg: Block = {
    slug: 'wysiwyg',
    interfaceName: 'WysiwygBlock',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'body',
            type: 'richText',
            required: true
        },
    ]
}

export default Wysiwyg
