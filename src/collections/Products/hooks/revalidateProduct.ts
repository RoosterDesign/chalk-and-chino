import type { Product } from '@/payload-types'
import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
} from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateProduct: CollectionAfterChangeHook<Product> = async ({
    doc,
    req,
}) => {
    const productSlug = doc.slug

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

    return doc
}

export const revalidateProductDelete: CollectionAfterDeleteHook<Product> = async ({
    doc,
    req,
}) => {
    const productSlug = doc.slug

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

    return doc
}
