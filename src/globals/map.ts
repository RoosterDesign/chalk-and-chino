import type { GlobalConfig } from "payload";

import sectionHeader from "@/fields/sectionHeader";

export const Map: GlobalConfig = {
    slug: "payment-delivery-details",
    label: "Payment & Delivery Details",
    fields: [
        sectionHeader,
        {
            name: "embedCode",
            label: "iFrame Map Embed Code",
            type: "text",
            required: true,
        },
    ],
};

export default Map;
