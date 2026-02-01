import type { GlobalAfterChangeHook, GlobalConfig } from "payload";

import { revalidateTag } from "next/cache";

const revalidateFooter: GlobalAfterChangeHook = ({ doc }) => {
    revalidateTag("global-footer");
    return doc;
};

export const Footer: GlobalConfig = {
    slug: "footer",
    label: "Footer",
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "footerText",
            label: "Footer Text",
            type: "textarea",
            required: true,
            admin: {
                description: "This text will appear in the footer.",
            },
        },
        {
            name: "footerLinks",
            label: "Footer Links",
            type: "array",
            minRows: 1,
            maxRows: 4,
            fields: [
                {
                    name: "label",
                    type: "text",
                    required: true,
                },
                {
                    name: "url",
                    type: "text",
                    required: true,
                },
            ],
        },
    ],
    hooks: {
        afterChange: [revalidateFooter],
    },
};
