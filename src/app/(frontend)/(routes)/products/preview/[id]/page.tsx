import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

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

    const product = await getProductById(id, { draft });

    if (!product) return notFound();

    const global = await getPaymentDeliveryDetails();

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
