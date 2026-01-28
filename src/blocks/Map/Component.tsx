import { unstable_cache } from "next/cache";

import Container from "@/app/components/container/container";
import SectionHeader from "@/app/components/section-header/section-header";
import { mapSectionHeader } from "@/lib/mappers/mapSectionHeader";
import { getPayloadClient } from "@/lib/payloadClient";

import styles from "./styles.module.scss";

const getCachedMap = unstable_cache(
    async () => {
        const payload = await getPayloadClient();
        return payload.findGlobal({ slug: "map" });
    },
    ["map-global"],
    {
        revalidate: false,
        tags: ["global-map"],
    },
);

export default async function MapBlock() {
    const mapGlobal = await getCachedMap();

    if (!mapGlobal.embedCode) return null;

    return (
        <section className={styles.mapSection}>
            <Container>
                <SectionHeader {...mapSectionHeader(mapGlobal.sectionHeader)} />
            </Container>
            <div className={styles.mapContainer}>
                <iframe
                    allowFullScreen
                    height="400"
                    loading="lazy"
                    src={mapGlobal.embedCode}
                    title="Map showing Chalk & Chino's location"
                    width="100%"
                />
            </div>
        </section>
    );
}
