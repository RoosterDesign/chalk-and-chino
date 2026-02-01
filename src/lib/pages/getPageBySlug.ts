import { unstable_cache } from 'next/cache';
import type { RequiredDataFromCollectionSlug } from 'payload';

import { getPayloadClient } from '@/lib/payloadClient';

export const getPageBySlug = unstable_cache(
    async (slug: string): Promise<null | RequiredDataFromCollectionSlug<'pages'>> => {
        const payload = await getPayloadClient();

        const result = await payload.find({
            collection: 'pages',
            draft: false,
            limit: 1,
            depth: 2,
            pagination: false,
            where: {
                slug: {
                    equals: slug,
                },
            },
        });

        return result.docs?.[0] || null;
    },
    ['get-page-by-slug'],
    {
        revalidate: false,
        tags: ['pages'],
    },
);
