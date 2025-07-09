import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

import ProductDetails from "@/app/components/product-details/product-details";
import { LivePreviewListener } from "@/app/LivePreviewListener";
import Testimonials from "@/blocks/Testimonials/Component";
import { getProductById } from "@/lib/products/getProductById";
import configPromise from "@/payload.config";

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

    const product = await getProductById(id, { draft });

    if (!product) return notFound();

    const payload = await getPayload({ config: configPromise });
    const global = await payload.findGlobal({
        slug: "payment-delivery-details",
    });

    return (
        <>
            {draft && <LivePreviewListener />}
            <ProductDetails
                defaultDeliveryText={global?.customText || ""}
                product={product}
            />
            <Testimonials />
        </>
    );
}
