import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateCategory: CollectionAfterChangeHook = async ({ doc }) => {
    const path = `/products/${doc.slug}`
    revalidatePath('/products')
    revalidatePath(path)
    revalidateTag('categories') // if you tag category nav or category queries
    return doc
}

export const revalidateCategoryDelete: CollectionAfterDeleteHook = async ({ doc }) => {
    const path = `/products/${doc.slug}`
    revalidatePath('/products')
    revalidatePath(path)
    revalidateTag('categories')
    return doc
}
