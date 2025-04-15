import configPromise from '@/payload.config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getProducts = cache(async () => {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: 'products',
        depth: 1,
        limit: 100,
        pagination: false,
        draft: false
    })

    return docs

})
