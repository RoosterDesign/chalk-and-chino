import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'

const revalidateTestimonials: CollectionAfterChangeHook = ({ doc }) => {
    revalidateTag('testimonials')
    return doc
}

const revalidateTestimonialsDelete: CollectionAfterDeleteHook = ({ doc }) => {
    revalidateTag('testimonials')
    return doc
}

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
export const Testimonials: CollectionConfig = {
    slug: 'testimonials',
    admin: {
        useAsTitle: 'author',
        defaultColumns: ['author', 'quote', '_status', 'createdAt']
    },
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    fields: [
        {
            name: 'stars',
            type: 'select',
            required: true,
            defaultValue: '5',
            options: [
                {
                    label: '1 Star',
                    value: '1',
                },
                {
                    label: '2 Stars',
                    value: '2',
                },
                {
                    label: '3 Stars',
                    value: '3',
                },
                {
                    label: '4 Stars',
                    value: '4',
                },
                {
                    label: '5 Stars',
                    value: '5',
                },
            ]
        },
        {
            name: 'author',
            type: 'text',
            required: false
        },
        {
            name: 'quote',
            type: 'textarea',
            required: true
        }
    ],
    hooks: {
        afterChange: [revalidateTestimonials],
        afterDelete: [revalidateTestimonialsDelete],
    }
}
