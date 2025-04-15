import configPromise from '@/payload.config'
import { getPayload } from 'payload'
// import { cache } from 'react'

export const getProducts = async () => {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
        collection: 'products',
        where: {
            _status: {
                equals: 'published',
            }
        },
        depth: 1,
        limit: 100,
        pagination: false,
        draft: false
    })

    return docs

}
