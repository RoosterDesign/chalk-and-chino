import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import Container from '@/app/components/container/container';
import SectionHeader from '@/app/components/section-header/section-header';
import { mapSectionHeader } from '@/lib/mappers/mapSectionHeader';
import TestimonialCard from '@/components/testimonialCard/testimonialCard';
import styles from './styles.module.scss';
import { isFullTestimonial } from '@/lib/utils/typeGuards';

const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({ sectionHeader, testimonials }) => {

    console.log(testimonials);

    const validTestimonials = Array.isArray(testimonials)
        ? testimonials.filter(isFullTestimonial)
        : [];

    return (
        <section className="section-spacing">
            <Container>
                <SectionHeader {...mapSectionHeader(sectionHeader)} />
                <div className={styles.testimonials}>
                    {validTestimonials.map((testimonial) =>
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    )}
                </div>
            </Container>
        </section>
    )
}

export default TestimonialsBlock
