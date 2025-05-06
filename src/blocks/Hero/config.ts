import { Block } from "payload";

const HeroBlock: Block = {
    slug: 'hero',
    interfaceName: 'HeroBlock',
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
            name: 'intro',
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
                    required: true
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true
                },
            ]
        }
    ]
}

export default HeroBlock;
