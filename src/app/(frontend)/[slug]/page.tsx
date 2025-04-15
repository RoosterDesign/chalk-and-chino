import { LivePreviewListener } from '@/app/LivePreviewListener'
import { RenderBlocks } from '@/blocks/RenderBlocks';
import { getPageBySlug } from '@/lib/pages/getPageBySlug';
import configPromise from '@/payload.config';
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation';
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'

type PageParams = {
    slug?: string;
};

type Props = {
    params: Promise<PageParams>
}

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
        collection: 'pages',
        draft: true,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: {
            slug: true,
        },
    })

    const params = pages.docs
        ?.filter((doc) => doc.slug !== 'home')
        .map(({ slug }) => ({ slug }))

    return params
}

export default async function Page({ params }: Props) {

    const { slug = 'home' } = await params
    const { isEnabled: draft } = await draftMode()

    const page = await getPageBySlug(slug);

    if (!page) {
        notFound();
    }

    const { layout } = page

    return (
        <>
            {draft && <LivePreviewListener />}
            <RenderBlocks blocks={layout} />
        </>
    )
}
