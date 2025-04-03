import Container from '@/app/components/container/container';
import SectionHeader from '@/app/components/section-header/section-header';
import testimonials from '@/app/data/testimonials.json';

import TestimonialCard from './testimonialCard/testimonialCard';
import styles from './testimonials.module.scss';

const Testimonials: React.FC = () => {
    return (
        <section className="section-spacing">
            <Container>
                <SectionHeader centered intro="See what our happy customers have to say about our upcycled furniture and personalised service." title="Testimonials" />
                <div className={styles.testimonials}>
                    {testimonials.map((testimonial, i) =>
                        <TestimonialCard key={i} testimonial={testimonial} />
                    )}
                </div>
            </Container>
        </section>

    )
}

export default Testimonials;
