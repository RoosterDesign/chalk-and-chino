import type { Media, ProductCategory } from '@/payload-types'

import configPromise from '@/payload.config'
import { getPayload } from 'payload'

export const getProductCategories = async ({
    withImages = false,
}: {
    withImages?: boolean
} = {}): Promise<
    {
        image?: Media
        label: string
        url: string
    }[]
> => {
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
        collection: 'product-categories',
        sort: 'name',
        limit: 50,
        draft: false,
        pagination: false,
        ...(withImages && { depth: 2 }), // Ensures we get full media object
    })

    return docs.map((category: ProductCategory) => ({
        label: category.name,
        url: `/products/${category.slug}`,
        image:
            withImages && typeof category.image === 'object'
                ? (category.image as Media)
                : undefined,
    }))
}
