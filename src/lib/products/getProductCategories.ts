import configPromise from '@/payload.config'
import { getPayload } from 'payload'

export const getProductCategories = async ({
    withImages = false,
}: {
    withImages?: boolean
} = {}) => {
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
        image: withImages ? category.image : undefined,
    }))
}
