// src/collections/Products/hooks/revalidateProduct.ts

import type { Product } from '@/payload-types'
import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
} from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateProduct: CollectionAfterChangeHook<Product> = async ({
    doc,
    previousDoc,
    req,
}) => {
    const productSlug = doc.slug
    const productPath = `/products/${productSlug}`

    revalidatePath(productPath)
    revalidateTag('products')

    // If categories are assigned to this product, revalidate their pages
    const currentCategoryIDs = Array.isArray(doc.categories) ? doc.categories : []

    if (currentCategoryIDs.length > 0) {
        const payload = req.payload

        const categories = await payload.find({
            collection: 'product-categories',
            where: {
                id: { in: currentCategoryIDs },
            },
        })

        categories.docs.forEach((category) => {
            const path = `/products/${category.slug}`
            revalidatePath(path)
            revalidateTag(`category-${category.slug}`)
        })
    }

    return doc
}

export const revalidateProductDelete: CollectionAfterDeleteHook<Product> = async ({
    doc,
    req,
}) => {
    const productSlug = doc.slug
    const productPath = `/products/${productSlug}`

    revalidatePath(productPath)
    revalidateTag('products')

    const categoryIDs = Array.isArray(doc.categories) ? doc.categories : []

    if (categoryIDs.length > 0) {
        const payload = req.payload

        const categories = await payload.find({
            collection: 'product-categories',
            where: {
                id: { in: categoryIDs },
            },
        })

        categories.docs.forEach((category) => {
            const path = `/products/${category.slug}`
            revalidatePath(path)
            revalidateTag(`category-${category.slug}`)
        })
    }

    return doc
}
