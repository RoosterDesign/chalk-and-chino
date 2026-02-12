import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
} from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Product } from '@/payload-types'

export const revalidateProduct: CollectionAfterChangeHook<Product> = async ({
    doc,
}) => {
    try {
        const productSlug = doc.slug

        // Product listings
        revalidatePath('/products')

        if (typeof productSlug === 'string' && productSlug.trim() !== '') {
            const productPath = `/products/${productSlug}`
            revalidatePath(productPath)
            revalidateTag('products')
        }

        if (typeof doc.category === 'object' && doc.category?.slug) {
            const path = `/products/${doc.category.slug}`
            revalidatePath(path)
            revalidateTag(`category-${doc.category.slug}`)
        }
    } catch {
        // revalidation can fail if called during render (e.g. autosave during admin page load)
    }

    return doc
}

export const revalidateProductDelete: CollectionAfterDeleteHook<Product> = async ({
    doc,
}) => {
    try {
        const productSlug = doc.slug

        // Product listings
        revalidatePath('/products')

        if (typeof productSlug === 'string' && productSlug.trim() !== '') {
            const productPath = `/products/${productSlug}`
            revalidatePath(productPath)
            revalidateTag('products')
        }

        if (typeof doc.category === 'object' && doc.category?.slug) {
            const path = `/products/${doc.category.slug}`
            revalidatePath(path)
            revalidateTag(`category-${doc.category.slug}`)
        }
    } catch {
        // revalidation can fail if called during render
    }

    return doc
}
