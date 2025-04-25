import type { CheckboxField, TextField } from 'payload'

import { formatSlugHook } from './formatSlug'

type Overrides = {
    checkboxOverrides?: Partial<CheckboxField>
    slugOverrides?: Partial<TextField>
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
    const { slugOverrides, checkboxOverrides } = overrides

    const checkBoxField: CheckboxField = {
        name: 'slugLock',
        type: 'checkbox',
        defaultValue: true,
        admin: {
            hidden: true,
            position: 'sidebar',
        },
        ...checkboxOverrides,
    }

    // @ts-expect-error - ts mismatch Partial<TextField> with TextField
    const slugField: TextField = {
        name: 'slug',
        type: 'text',
        required: true,
        index: true,
        label: 'Slug',
        ...(slugOverrides || {}),
        hooks: {
            // Kept this in for hook or API based updates
            beforeValidate: [formatSlugHook(fieldToUse)],
        },
        admin: {
            position: 'sidebar',
            description: 'Leave locked to auto-generate from page name. Unlock to edit manually.',
            ...(slugOverrides?.admin || {}),
            components: {
                Field: {
                    path: '@/fields/slug/SlugComponent#SlugComponent',
                    clientProps: {
                        fieldToUse,
                        checkboxFieldPath: checkBoxField.name,
                    },
                },
            },
        },
    }

    return [slugField, checkBoxField]
}
