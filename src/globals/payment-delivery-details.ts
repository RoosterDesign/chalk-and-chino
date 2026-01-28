import type { GlobalAfterChangeHook, GlobalConfig } from "payload";
import { revalidateTag } from "next/cache";

const revalidatePaymentDelivery: GlobalAfterChangeHook = ({ doc }) => {
    revalidateTag("global-payment-delivery");
    return doc;
};

export const PaymentDeliveryDetails: GlobalConfig = {
    slug: "payment-delivery-details",
    label: "Payment & Delivery Details",
    fields: [
        {
            name: "customText",
            label: "Custom Payment & Delivery Details",
            type: "textarea",
            required: false,
            admin: {
                description:
                    "This text will appear on the product details page.",
            },
        },
    ],
    hooks: {
        afterChange: [revalidatePaymentDelivery],
    },
};

export default PaymentDeliveryDetails;
