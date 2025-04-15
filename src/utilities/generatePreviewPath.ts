import type { CollectionSlug } from 'payload'

export const generatePreviewPath = ({ collection, data, slug }: {
    collection: CollectionSlug
    data: Record<string, any>
    slug: string
}) => {
    let path = ''

    if (collection === 'pages') {
        const safeSlug = slug === 'home' ? '' : slug
        path = `/${safeSlug}`
    }

    if (collection === 'products') {
        const firstCategory = data?.categories?.[0]
        const categorySlug =
            typeof firstCategory === 'object' && firstCategory?.slug
                ? firstCategory.slug
                : 'uncategorised'

        path = `/products/${categorySlug}/${slug}`
    }

    const encodedParams = new URLSearchParams({
        slug,
        collection,
        path,
        previewSecret: process.env.PREVIEW_SECRET || '',
    })

    return `/next/preview?${encodedParams.toString()}`
}
