import type { Testimonial, TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

import Container from '@/app/components/container/container';
import SectionHeader from '@/app/components/section-header/section-header';
import TestimonialCard from '@/components/testimonialCard/testimonialCard';
import { mapSectionHeader } from '@/lib/mappers/mapSectionHeader';
import { isFullTestimonial } from '@/lib/utils/typeGuards';
import configPromise from '@/payload.config';
import { getPayload } from 'payload';

import styles from './styles.module.scss';

type Props = Partial<TestimonialsBlockProps>;

const TestimonialsBlock: React.FC<Props> = async ({ sectionHeader, testimonials }) => {

    let testimonialsToRender: Testimonial[] = [];

    if (Array.isArray(testimonials) && testimonials.length > 0) {
        testimonialsToRender = testimonials.filter(isFullTestimonial);
    } else {
        const payload = await getPayload({ config: configPromise });
        const allTestimonials = await payload.find({
            collection: 'testimonials',
            limit: 100,
            pagination: false,
        });

        testimonialsToRender = allTestimonials.docs
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
    }

    /*const validTestimonials = Array.isArray(testimonials)
        ? testimonials.filter(isFullTestimonial)
        : [];*/

    return (
        <section className="section-spacing">
            <Container>
                <SectionHeader {...mapSectionHeader(sectionHeader)} />
                <div className={styles.testimonials}>
                    {testimonialsToRender.map((testimonial) =>
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    )}
                </div>
            </Container>
        </section>
    )
}

export default TestimonialsBlock
