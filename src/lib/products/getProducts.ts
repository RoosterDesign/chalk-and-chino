import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payloadClient'

const getCachedProducts = unstable_cache(
    async () => {
        const payload = await getPayloadClient();

        const { docs } = await payload.find({
            collection: 'products',
            where: {
                _status: {
                    equals: 'published',
                },
            },
            depth: 1,
            limit: 100,
            pagination: false,
            draft: false,
        });

        return docs;
    },
    ['all-products'],
    {
        revalidate: false,
        tags: ['products'],
    },
);

export const getProducts = async () => getCachedProducts();
