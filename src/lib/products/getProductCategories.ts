import type { Media, ProductCategory } from '@/payload-types'

import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payloadClient'

const mapCategory = (category: ProductCategory, withImages: boolean) => ({
    label: category.name,
    url: `/products/${category.slug}`,
    image:
        withImages && typeof category.image === 'object'
            ? (category.image as Media)
            : undefined,
});

const cachedCategories = unstable_cache(
    async () => {
        const payload = await getPayloadClient();

        const { docs } = await payload.find({
            collection: 'product-categories',
            sort: 'name',
            limit: 50,
            draft: false,
            pagination: false,
        });

        return docs.map((category: ProductCategory) => mapCategory(category, false));
    },
    ['product-categories', 'no-images'],
    {
        revalidate: false,
        tags: ['categories'],
    },
);

const cachedCategoriesWithImages = unstable_cache(
    async () => {
        const payload = await getPayloadClient();

        const { docs } = await payload.find({
            collection: 'product-categories',
            sort: 'name',
            limit: 50,
            draft: false,
            pagination: false,
            depth: 2, // Ensures we get full media object
        });

        return docs.map((category: ProductCategory) => mapCategory(category, true));
    },
    ['product-categories', 'with-images'],
    {
        revalidate: false,
        tags: ['categories'],
    },
);

export const getProductCategories = async ({
    withImages = false,
}: {
    withImages?: boolean
} = {}) => (withImages ? cachedCategoriesWithImages() : cachedCategories());
