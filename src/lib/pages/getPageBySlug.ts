import { draftMode } from 'next/headers';
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload';
import { cache } from 'react';

import configPromise from '@/payload.config';

export const getPageBySlug = cache(
    async (slug: string): Promise<null | RequiredDataFromCollectionSlug<'pages'>> => {
        const { isEnabled: draft } = await draftMode()
        const payload = await getPayload({ config: configPromise })

        const result = await payload.find({
            collection: 'pages',
            draft,
            limit: 1,
            depth: 2,
            pagination: false,
            overrideAccess: draft,
            where: {
                slug: {
                    equals: slug,
                },
            },
        })

        return result.docs?.[0] || null

    }
);
