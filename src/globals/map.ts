import type { GlobalAfterChangeHook, GlobalConfig } from "payload";
import { revalidateTag } from "next/cache";

const revalidateMap: GlobalAfterChangeHook = ({ doc }) => {
    revalidateTag("global-map");
    return doc;
};

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
    hooks: {
        afterChange: [revalidateMap],
    },
};

export default Map;
