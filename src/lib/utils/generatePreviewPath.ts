import type { CollectionSlug } from 'payload'

type Args = {
    collection: CollectionSlug
    data: {
        id?: string
        slug?: string
    }
}

export const generatePreviewPath = ({ collection, data }: Args): string => {
    const previewSecret = process.env.PREVIEW_SECRET || ''
    let path = ''

    if (collection === 'products') {
        const id = data?.id
        if (!id) {
            return ''
        }
        path = `/products/preview/${id}`
    }

    if (collection === 'pages') {
        const slug = data?.slug
        const safeSlug = slug === 'homepage' ? '' : slug || ''
        path = `/${safeSlug}`
    }

    const query = new URLSearchParams({
        path,
        previewSecret,
    }).toString()

    return `/api/preview?${query}`
}

/*import type { CollectionSlug } from 'payload'

export const generatePreviewPath = ({ collection, data }: {
    collection: CollectionSlug
    data: Record<string, any>
}) => {
    let path = ''

    if (collection === 'pages') {
        const safeSlug = data.slug === 'homepage' ? '' : data.slug
        path = `/${safeSlug}`
    }

    if (collection === 'products') {
        const productId = data.id;
        if (!productId) {
            // throw new Error('Missing product ID for preview path');
            return null;
        }
        path = `/products/preview/${productId}`;
    }

    const encodedParams = new URLSearchParams({
        collection,
        path,
        previewSecret: process.env.PREVIEW_SECRET || '',
    })

    return `/api/preview?${encodedParams.toString()}`
}
*/
