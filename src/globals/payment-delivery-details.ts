import type { GlobalConfig } from 'payload'

export const PaymentDeliveryDetails: GlobalConfig = {
    slug: 'payment-delivery-details',
    label: 'Payment & Delivery Details',
    fields: [
        {
            name: 'customText',
            label: 'Custom Payment & Delivery Details',
            type: 'richText',
            required: false,
            admin: {
                description: 'This text will appear on the product details page.',
            },
        },
    ]
}

export default PaymentDeliveryDetails;
