import configPromise from '@/payload.config'
import { getPayload } from 'payload'

export const getProductBySlug = async (slug: string, { draft = false } = {}) => {
    const payload = await getPayload({ config: configPromise })

    const res = await payload.find({
        collection: 'products',
        where: { slug: { equals: slug } },
        depth: 2,
        limit: 1,
        draft
    })

    return res.docs?.[0] || null
}
