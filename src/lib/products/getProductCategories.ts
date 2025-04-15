import type { CategoryType } from '@/lib/types';

import configPromise from '@/payload.config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getProductCategories = cache(async ({
    withImages = false,
}: {
    withImages?: boolean
} = {}): Promise<CategoryType[]> => {
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
        collection: 'product-categories',
        sort: 'name',
        limit: 50,
        draft: false,
        pagination: false,
        ...(withImages && { depth: 1 }),
    })

    return docs.map((category) => ({
        label: category.name,
        url: `/products/${category.slug}`,
        image: withImages && typeof category.image === 'object' && category.image !== null
            ? {
                url: category.image.url || '',
                alt: category.image.alt || category.name,
            }
            : undefined
    }))
})
