import type { GlobalAfterChangeHook, GlobalConfig } from "payload";
import { revalidateTag } from "next/cache";

const revalidateTestimonialsSettings: GlobalAfterChangeHook = ({ doc }) => {
    revalidateTag("global-testimonials-settings");
    return doc;
};

import sectionHeader from "@/fields/sectionHeader";

export const TestimonialsSettings: GlobalConfig = {
    slug: "testimonials-settings",
    label: "Testimonials Settings",
    access: {
        read: () => true,
    },
    fields: [sectionHeader],
    hooks: {
        afterChange: [revalidateTestimonialsSettings],
    },
};

export default TestimonialsSettings;
