import { unstable_cache } from 'next/cache';

import type { Where } from 'payload';

import { getPayloadClient } from '@/lib/payloadClient';

const getCachedLatestProducts = unstable_cache(
    async (limit: number = 4, excludeIds: number[] = []) => {
        const payload = await getPayloadClient();

        const where: Where = {
            _status: {
                equals: 'published',
            },
        };

        // Exclude specific product IDs if provided
        if (excludeIds.length > 0) {
            where.id = {
                not_in: excludeIds,
            };
        }

        const { docs } = await payload.find({
            collection: 'products',
            where,
            sort: '-createdAt',
            depth: 1,
            limit,
            pagination: false,
            draft: false,
        });

        return docs;
    },
    ['latest-products'],
    {
        revalidate: false,
        tags: ['products'],
    },
);

export const getLatestProducts = async (limit: number = 4, excludeIds: number[] = []) =>
    getCachedLatestProducts(limit, excludeIds);
