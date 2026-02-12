import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateCategory: CollectionAfterChangeHook = async ({ doc }) => {
    try {
        const path = `/products/${doc.slug}`
        revalidatePath('/products')
        revalidatePath(path)
        revalidateTag('categories')
    } catch {
        // revalidation can fail if called during render (e.g. autosave during admin page load)
    }
    return doc
}

export const revalidateCategoryDelete: CollectionAfterDeleteHook = async ({ doc }) => {
    try {
        const path = `/products/${doc.slug}`
        revalidatePath('/products')
        revalidatePath(path)
        revalidateTag('categories')
    } catch {
        // revalidation can fail if called during render
    }
    return doc
}
