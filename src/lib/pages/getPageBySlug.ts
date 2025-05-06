import configPromise from '@/payload.config';
import { draftMode } from 'next/headers';
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload';
import { cache } from 'react';

export const getPageBySlug = cache(
    async (slug: string): Promise<null | RequiredDataFromCollectionSlug<'pages'>> => {
        const { isEnabled: draft } = await draftMode()
        const payload = await getPayload({ config: configPromise })

        const result = await payload.find({
            collection: 'pages',
            draft,
            limit: 1,
            pagination: false,
            overrideAccess: draft,
            where: {
                slug: {
                    equals: slug,
                },
            },
        })

        console.dir(result.docs?.[0]?.layout, { depth: null });

        return result.docs?.[0] || null

    }
);
