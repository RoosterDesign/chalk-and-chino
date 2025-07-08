import { getPayload } from 'payload'

import config from '@/payload.config'

export const getAllProductsCategory = async () => {
    const payload = await getPayload({ config })
    const allProductsCategory = await payload.findGlobal({ slug: 'all-products-category' })
    return allProductsCategory;
}
