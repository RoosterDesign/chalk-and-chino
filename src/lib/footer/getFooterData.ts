import config from "@/payload.config";
import { getPayload } from "payload";

export type FooterData = {
    footerLinks: { label: string; url: string }[];
    footerText: string;
};

export const getFooterData = async (): Promise<FooterData> => {
    const payload = await getPayload({ config });
    const nav = await payload.findGlobal({ slug: "footer" });
    return {
        footerText: nav.footerText || "",
        footerLinks: nav.footerLinks || [],
    };
};
