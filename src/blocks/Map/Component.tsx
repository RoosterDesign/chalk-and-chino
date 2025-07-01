import Container from "@/app/components/container/container";
import SectionHeader from "@/app/components/section-header/section-header";
import { mapSectionHeader } from "@/lib/mappers/mapSectionHeader";
import configPromise from "@/payload.config";
import { getPayload } from "payload";

import styles from "./styles.module.scss";

export default async function MapBlock() {
    const payload = await getPayload({ config: configPromise });
    const mapGlobal = await payload.findGlobal({ slug: "map" });

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
                    src={mapGlobal.embedCode}
                    width="100%"
                />
            </div>
        </section>
    );
}
