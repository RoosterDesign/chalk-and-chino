import { Block } from 'payload'

const GalleryTextBanner: Block = {
    slug: 'galleryTextBanner',
    interfaceName: 'GalleryTextBannerBlock',
    fields: [
        {
            name: 'reverse',
            label: 'Reverse direction (Text Left/Image Right)',
            type: 'checkbox',
            defaultValue: false,
        },
        {
            name: 'atTop',
            label: 'Appears at top of page (first element)',
            type: 'checkbox',
            defaultValue: false,
        },
        {
            name: 'image1',
            label: 'Image 1',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'image2',
            label: 'Image 2',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'image3',
            label: 'Image 3',
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
            type: 'richText',
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
                    required: false
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

export default GalleryTextBanner
