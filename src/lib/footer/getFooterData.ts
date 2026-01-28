import { unstable_cache } from "next/cache";

import { getPayloadClient } from "@/lib/payloadClient";

export type FooterData = {
    footerLinks: { label: string; url: string }[];
    footerText: string;
};

const getCachedFooter = unstable_cache(
    async (): Promise<FooterData> => {
        const payload = await getPayloadClient();
        const nav = await payload.findGlobal({ slug: "footer" });
        return {
            footerText: nav.footerText || "",
            footerLinks: nav.footerLinks || [],
        };
    },
    ["footer-data"],
    {
        revalidate: false,
        tags: ["global-footer"],
    },
);

export const getFooterData = async (): Promise<FooterData> => getCachedFooter();
