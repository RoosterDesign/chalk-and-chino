import configPromise from '@/payload.config'
import { getPayload } from 'payload'

type Options = {
    draft?: boolean
}

export const getProductById = async (
    id: string,
    options: Options = {}
) => {
    const payload = await getPayload({ config: configPromise })

    const { draft = true } = options

    try {
        const result = await payload.findByID({
            collection: 'products',
            id,
            depth: 2,
            draft,
        })

        return result
    } catch (error) {
        console.error(`[getProductById] Error fetching product with ID ${id}:`, error)
        return null
    }
}
