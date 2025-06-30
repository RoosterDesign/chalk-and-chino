import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    admin: {
        useAsTitle: 'email',
    },
    auth: true,
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'role',
            type: 'select',
            required: true,
            defaultValue: 'editor',
            options: [
                {
                    label: 'Editor',
                    value: 'editor',
                },
                {
                    label: 'Admin',
                    value: 'admin',
                }
            ],
            access: {
                update: ({ req }) => req.user?.role === 'admin',
            },
            admin: {
                position: 'sidebar',
                condition: (_, __, { user }) => user?.role === 'admin', // hide from UI too
            },
        }
    ],
}
