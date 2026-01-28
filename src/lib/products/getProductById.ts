import { getPayloadClient } from '@/lib/payloadClient'

type Options = {
    draft?: boolean
}

export const getProductById = async (
    id: string,
    options: Options = {}
) => {
    const payload = await getPayloadClient()

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
