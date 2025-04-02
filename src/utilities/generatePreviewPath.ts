// export const generatePreviewPath = ({ slug }: { slug: string }) => {
//     const safeSlug = slug === 'home' ? '' : slug
//     return `/api/preview?redirect=/${safeSlug}`
// }

import { CollectionSlug, PayloadRequest } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
    pages: '',
}

type Props = {
    collection: keyof typeof collectionPrefixMap
    req: PayloadRequest
    slug: string
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
    const encodedParams = new URLSearchParams({
        slug,
        collection,
        path: `${collectionPrefixMap[collection]}/${slug}`,
        previewSecret: process.env.PREVIEW_SECRET || '',
    })

    const url = `/next/preview?${encodedParams.toString()}`

    return url
}
