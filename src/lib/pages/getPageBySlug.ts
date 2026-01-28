import { unstable_cache } from 'next/cache';
import { draftMode } from 'next/headers';
import type { RequiredDataFromCollectionSlug } from 'payload';

import { getPayloadClient } from '@/lib/payloadClient';

const getPublishedPage = unstable_cache(
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
        })

        return result.docs?.[0] || null

    },
    ['get-page-by-slug'],
    {
        revalidate: false,
        tags: ['pages'],
    },
);

export const getPageBySlug = async (slug: string): Promise<null | RequiredDataFromCollectionSlug<'pages'>> => {
    const { isEnabled: draft } = await draftMode();

    if (draft) {
        const payload = await getPayloadClient();

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
        });

        return result.docs?.[0] || null;
    }

    return getPublishedPage(slug);
};
