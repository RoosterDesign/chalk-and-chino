import Container from '@/app/components/container/container';
import TestimonialCard from './testimonialCard/testimonialCard';
import styles from './testimonials.module.scss';

import testimonials from '@/app/data/testimonials.json';

type TestimonialsProps = {
    children: React.ReactNode;
}

const Testimonials: React.FC<TestimonialsProps> = ({ children }) => {
    return (
        <section className="section-spacing">
            <Container>
                {children}

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
