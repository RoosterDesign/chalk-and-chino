import { Block } from 'payload'

const BannerBlock: Block = {
    slug: 'banner',
    interfaceName: 'bannerBlock',
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
        {
            name: 'body',
            type: 'textarea',
            required: true
        },
        {
            name: 'cta_button',
            label: 'CTA Button',
            type: 'group',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: false,
                    defaultValue: 'Find out more'
                },
                {
                    name: 'url',
                    type: 'text',
                    required: false
                },
            ]
        }
    ]
}

export default BannerBlock
