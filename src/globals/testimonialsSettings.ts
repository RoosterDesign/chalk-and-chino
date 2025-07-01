import type { GlobalConfig } from "payload";

import sectionHeader from "@/fields/sectionHeader";

export const TestimonialsSettings: GlobalConfig = {
    slug: "testimonials-settings",
    label: "Testimonials Settings",
    access: {
        read: () => true,
    },
    fields: [sectionHeader],
};

export default TestimonialsSettings;
