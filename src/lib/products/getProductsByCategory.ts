import configPromise from '@/payload.config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getProductsByCategory = cache(async (categorySlug: string) => {

    const payload = await getPayload({ config: configPromise })

    const categoryRes = await payload.find({
        collection: 'product-categories',
        where: {
            slug: { equals: categorySlug },
        },
        depth: 0,
        limit: 1,
    })

    const category = categoryRes.docs?.[0]
    if (!category) return { category: null, products: [] }

    const productRes = await payload.find({
        collection: 'products',
        where: {
            categories: {
                equals: category.id,
            },
        },
        depth: 1,
        limit: 100,
        pagination: false,
        draft: false,
    })

    return {
        category,
        products: productRes.docs,
    }
})
