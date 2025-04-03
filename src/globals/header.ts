// globals/header.ts
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
    slug: 'header',
    label: 'Main Navigation',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'navItems',
            label: 'Navigation Items',
            type: 'array',
            minRows: 1,
            maxRows: 6,
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
