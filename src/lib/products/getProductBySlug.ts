import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payloadClient'

const getPublishedProductBySlug = unstable_cache(
    async (slug: string) => {
        const payload = await getPayloadClient();

        const res = await payload.find({
            collection: 'products',
            where: { slug: { equals: slug } },
            depth: 2,
            limit: 1,
            draft: false,
        });

        return res.docs?.[0] || null;
    },
    ['product-by-slug'],
    {
        revalidate: false,
        tags: ['products'],
    },
);

export const getProductBySlug = async (slug: string, { draft = false } = {}) => {
    if (draft) {
        const payload = await getPayloadClient();

        const res = await payload.find({
            collection: 'products',
            where: { slug: { equals: slug } },
            depth: 2,
            limit: 1,
            draft,
        });

        return res.docs?.[0] || null;
    }

    return getPublishedProductBySlug(slug);
}
