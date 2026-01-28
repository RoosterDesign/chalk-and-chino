import { unstable_cache } from "next/cache";

import { getPayloadClient } from "@/lib/payloadClient";

const getCachedPaymentDelivery = unstable_cache(
    async () => {
        const payload = await getPayloadClient();
        return payload.findGlobal({
            slug: "payment-delivery-details",
        });
    },
    ["payment-delivery-details"],
    {
        revalidate: false,
        tags: ["global-payment-delivery"],
    },
);

export const getPaymentDeliveryDetails = async () => getCachedPaymentDelivery();
