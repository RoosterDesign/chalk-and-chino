import type { GlobalConfig } from "payload";

import sectionHeader from "@/fields/sectionHeader";

export const Map: GlobalConfig = {
    slug: "map",
    label: "Map",
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
