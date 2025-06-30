import configPromise from '@/payload.config'
import { getPayload } from 'payload'
// import { cache } from 'react'

export const getProductsByCategory = async (categorySlug: string) => {
    const payload = await getPayload({ config: configPromise })

    // Get the category by its slug
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

    // Fetch products that belong to this category
    const productRes = await payload.find({
        collection: 'products',
        where: {
            category: {
                equals: category.id,
            },
            _status: {
                equals: 'published',
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
}
