import type {
    Testimonial,
    TestimonialsBlock as TestimonialsBlockProps,
} from "@/payload-types";

import { unstable_cache } from "next/cache";

import Container from "@/app/components/container/container";
import SectionHeader from "@/app/components/section-header/section-header";
import TestimonialCard from "@/components/testimonialCard/testimonialCard";
import { mapSectionHeader } from "@/lib/mappers/mapSectionHeader";
import { getPayloadClient } from "@/lib/payloadClient";
import { isFullTestimonial } from "@/lib/utils/typeGuards";

import styles from "./styles.module.scss";

type Props = Partial<TestimonialsBlockProps>;

const getCachedTestimonialsSettings = unstable_cache(
    async () => {
        const payload = await getPayloadClient();
        return payload.findGlobal({
            slug: "testimonials-settings",
        });
    },
    ["testimonials-settings"],
    {
        revalidate: false,
        tags: ["global-testimonials-settings"],
    },
);

const getCachedTestimonials = unstable_cache(
    async () => {
        const payload = await getPayloadClient();
        const allTestimonials = await payload.find({
            collection: "testimonials",
            limit: 100,
            pagination: false,
        });

        return allTestimonials.docs;
    },
    ["testimonials-all"],
    {
        revalidate: false,
        tags: ["testimonials"],
    },
);

const TestimonialsBlock: React.FC<Props> = async ({ testimonials }) => {
    const settings = await getCachedTestimonialsSettings();
    const header = settings.sectionHeader;

    let testimonialsToRender: Testimonial[] = [];

    if (Array.isArray(testimonials) && testimonials.length > 0) {
        testimonialsToRender = testimonials.filter(isFullTestimonial);
    } else {
        const allTestimonials = await getCachedTestimonials();

        testimonialsToRender = allTestimonials
            .slice()
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
    }

    return (
        <section className="section-spacing">
            <Container>
                <SectionHeader {...mapSectionHeader(header)} />
                <div className={styles.testimonials}>
                    {testimonialsToRender.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default TestimonialsBlock;
