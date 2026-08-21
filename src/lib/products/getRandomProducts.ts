import type { Where } from 'payload';

import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/lib/payloadClient';

// Cap how much of the catalogue we pull to choose from, so this stays cheap as
// the product count grows.
const CANDIDATE_POOL = 50;

const getCachedCandidates = unstable_cache(
    async (excludeIds: number[] = []) => {
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
            limit: CANDIDATE_POOL,
            pagination: false,
            draft: false,
        });

        return docs;
    },
    ['random-product-candidates'],
    {
        revalidate: false,
        tags: ['products'],
    },
);

/**
 * A random selection of published products, optionally excluding some IDs.
 *
 * The query is cached, but the shuffle deliberately sits outside the cache so
 * the picks are not frozen alongside it. Pages built with ISR still bake one
 * selection in until they revalidate.
 */
export const getRandomProducts = async (limit: number = 4, excludeIds: number[] = []) => {
    const candidates = await getCachedCandidates(excludeIds);
    const shuffled = [...candidates];

    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, limit);
};
