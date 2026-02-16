import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import Gallery from "@/app/components/gallery/gallery";
import ProductDetails from "@/app/components/product-details/product-details";

// Preview pages should always be dynamic - never cache
export const dynamic = "force-dynamic";
import { LivePreviewListener } from "@/app/LivePreviewListener";
import Testimonials from "@/blocks/Testimonials/Component";
import { getPaymentDeliveryDetails } from "@/lib/globals/getPaymentDeliveryDetails";
import { getProductById } from "@/lib/products/getProductById";

type PageParams = {
    id: string;
};

type Props = {
    params: Promise<PageParams>;
};

export default async function ProductPreviewPage({ params }: Props) {
    const { isEnabled: draft } = await draftMode();

    const { id } = await params;

    if (!id) return notFound();

    // Fetch product and global data in parallel
    const [product, global] = await Promise.all([
        getProductById(id, { draft }),
        getPaymentDeliveryDetails(),
    ]);

    if (!product) return notFound();

    return (
        <>
            {draft && <LivePreviewListener />}
            <ProductDetails
                defaultDeliveryText={global?.customText || ""}
                product={product}
            />
            {product.gallery && product.gallery.length > 0 && (
                <Gallery images={product.gallery} />
            )}
            <Testimonials />
        </>
    );
}
