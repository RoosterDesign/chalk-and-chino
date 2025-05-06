import ProductDetails from '@/app/components/product-details/product-details'
import Testimonials from '@/app/components/testimonials/testimonials'
import { LivePreviewListener } from '@/app/LivePreviewListener'
import { getProductById } from '@/lib/products/getProductById'
import configPromise from '@/payload.config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type Props = {
    params: { id: string }
}

export default async function ProductPreviewPage({ params }: Props) {
    const { isEnabled: draft } = await draftMode()

    const { id } = await params;

    if (!id) return notFound();

    const product = await getProductById(id, { draft })

    if (!product) return notFound()

    const payload = await getPayload({ config: configPromise })
    const global = await payload.findGlobal({ slug: 'payment-delivery-details' })

    return (
        <>
            {draft && <LivePreviewListener />}
            <ProductDetails
                defaultDeliveryText={global?.customText}
                product={product}
            />
            <Testimonials />
        </>
    )
}
