import configPromise from '@/payload.config';
import { draftMode } from 'next/headers'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import React, { cache } from 'react'

import { RenderBlocks } from '../../../blocks/RenderBlocks';
import { LivePreviewListener } from '../LivePreviewListener'

// export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
//     const { slug = 'home' } = await paramsPromise
//     const page = await queryPageBySlug({
//         slug,
//     })

//     return generateMeta({ doc: page })
// }

type Args = {
    params: Promise<{
        slug?: string
    }>
}

// export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
//     const { slug = 'home' } = await paramsPromise
//     const page = await queryPageBySlug({
//         slug,
//     })

//     return generateMeta({ doc: page })
// }

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
        collection: 'pages',
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: {
            slug: true,
        },
    })

    const params = pages.docs
        ?.filter((doc) => {
            return doc.slug !== 'home'
        })
        .map(({ slug }) => {
            return { slug }
        })

    return params
}

// export default async function Page() {
export default async function Page({ params: paramsPromise }: Args) {

    const { isEnabled: draft } = await draftMode()
    const { slug = 'home' } = await paramsPromise
    const url = '/' + slug

    let page: null | RequiredDataFromCollectionSlug<'pages'>

    page = await queryPageBySlug({
        slug,
    })

    if (!page) {
        // return <PayloadRedirects url={url} />
        return <div>page not found</div>
    }

    const { layout } = page

    /*const headers = await getHeaders()
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const { user } = await payload.auth({ headers })

    const {
        docs: [page],
    } = await payload.find({
        collection: 'pages',
        draft: true,
        where: {
            slug: { equals: '/' },
        },
    })

    if (!page) {
        return <div>page not found</div>
    }*/

    return (
        <>
            {draft && <LivePreviewListener />}
            <RenderBlocks blocks={layout} />
        </>
    )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
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

    return result.docs?.[0] || null
})
