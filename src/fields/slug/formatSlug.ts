import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
    val
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .toLowerCase()

export const formatSlugHook =
    (fallback: string): FieldHook =>
        ({ data, operation, value, originalDoc }) => {
            const isLocked = data?.slugLock ?? originalDoc?.slugLock
            const fallbackValue = data?.[fallback] || originalDoc?.[fallback]

            // If slug is locked, always generate from fallback field
            if (isLocked) {
                if (typeof fallbackValue === 'string' && fallbackValue.trim()) {
                    return formatSlug(fallbackValue)
                }
                return value // fallback field is blank
            }

            // If unlocked and user typed something, format it
            if (typeof value === 'string' && value.trim()) {
                return formatSlug(value)
            }

            // If unlocked and slug is blank, fallback to field value
            if (!value && typeof fallbackValue === 'string') {
                return formatSlug(fallbackValue)
            }

            return value
        }
