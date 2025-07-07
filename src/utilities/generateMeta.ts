import type { Metadata } from 'next'

import { Config, Media, Product } from '@/payload-types'
import {getServerSideURL} from '@/utilities/getURL'
import {mergeOpenGraph} from '@/utilities/mergeOpenGraph'

const getImageURL = (image?: Config['db']['defaultIDType'] | Media | null) => {
    const serverUrl = getServerSideURL()
    let url = serverUrl + 'dog.jpg'

    if (image && typeof image === 'object' && url in image) {
        const ogURL = image.sizes?.productThumbnail?.url
        url = ogURL ? serverUrl + ogURL : serverUrl + image.url
    }

    return url
}

export const generateMeta = async (args: {doc: Partial<Product>}): Promise<Metadata> => {
    const {doc} = args || {}

    const ogImage: string = getImageURL(doc?.meta?.image)
    const title: string = doc.meta?.title ? doc.meta?.title : ' Blank Payload'
    const description: string = doc?.meta?.description ? doc.meta.description : ''

    return {
        title,
        description,
        openGraph: mergeOpenGraph({
            title,
            description,
            images: ogImage ? [{url: ogImage}] : undefined

        })

    }
}
