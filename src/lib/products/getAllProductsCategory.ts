import config from '@/payload.config'
import { getPayload } from 'payload'

export const getAllProductsCategory = async () => {
    const payload = await getPayload({ config })
    const allProductsCategory = await payload.findGlobal({ slug: 'all-products-category' })
    return allProductsCategory;
}
