import type { CollectionConfig } from 'payload'

import { HeroBlock } from '../blocks/Hero/config';

export const Pages: CollectionConfig = {
    slug: 'pages',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'slug',
            type: 'text',
            required: true
        },
        {
            name: 'layout',
            type: 'blocks',
            required: true,
            blocks: [
                HeroBlock
            ]
        }

    ]

}
