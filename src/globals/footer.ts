import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
    slug: 'footer',
    label: 'Footer Navigation',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'footerLinks',
            label: 'Footer Links',
            type: 'array',
            minRows: 1,
            maxRows: 4,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}
