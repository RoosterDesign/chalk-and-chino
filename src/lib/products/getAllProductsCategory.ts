import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payloadClient'

const getCachedAllProductsCategory = unstable_cache(
    async () => {
        const payload = await getPayloadClient();
        return payload.findGlobal({ slug: 'all-products-category', depth: 1 });
    },
    ['all-products-category'],
    {
        revalidate: false,
        tags: ['all-products-category'],
    },
);

export const getAllProductsCategory = async () => getCachedAllProductsCategory();
