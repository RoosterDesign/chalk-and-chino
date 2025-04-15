import Gallery from '@/app/components/gallery/gallery'
import Map from '@/app/components/map/map'
import NoResults from '@/app/components/no-results/no-results'
import ProductDetails from '@/app/components/product-details/product-details'
import Testimonials from '@/app/components/testimonials/testimonials'
import { LivePreviewListener } from '@/app/LivePreviewListener'
import { getProductBySlug } from '@/lib/products/getProductBySlug'
import { draftMode } from 'next/headers'

type Props = {
    params: Promise<{
        categorySlug: string
        productSlug: string,
    }>;
};

export default async function ProductPage({ params }: Props) {

    const { isEnabled: draft } = await draftMode()
    console.log('[Preview] draftMode is:', draft)

    const { productSlug } = await params;

    const product = await getProductBySlug(productSlug, { draft: draft })

    if (!product) {
        return <NoResults content="Product not found" />
    }

    return (
        <>
            {draft && <LivePreviewListener />}
            <ProductDetails product={product} />
            {/* <Gallery images={images} /> */}
            <Testimonials />
            <Map />
        </>
    );
}
