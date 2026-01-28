// globals/header.ts
import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'

const revalidateHeader: GlobalAfterChangeHook = ({ doc }) => {
    revalidateTag('global-header')
    return doc
}

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
    hooks: {
        afterChange: [revalidateHeader],
    },
}
