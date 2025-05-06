import styles from './testimonialCard.module.scss';
import type { Testimonial } from '@/payload-types';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
    const { author, quote, stars } = testimonial;
    return (
        <article className={styles.testimonial}>
            <figure>
                <blockquote>
                    <div className={styles.stars}>
                        {Array.from({ length: Number(stars) || 0 }).map((_, i) => (
                            <svg clipRule="evenodd" fillRule="evenodd" key={i} strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.322 2.923a.754.754 0 0 1 1.356 0l2.65 5.44 6.022.829a.749.749 0 0 1 .419 1.283c-1.61 1.538-4.382 4.191-4.382 4.191l1.069 5.952a.751.751 0 0 1-1.097.793L12 18.56l-5.359 2.851a.751.751 0 0 1-1.097-.793l1.07-5.952-4.382-4.191a.75.75 0 0 1 .419-1.283l6.021-.829 2.65-5.44z" fillRule="nonzero" /></svg>
                        ))}
                    </div>
                    <p>
                        {quote}
                    </p>
                </blockquote>
                {author &&
                    <figcaption>
                        <cite>- {author}</cite>
                    </figcaption>
                }
            </figure>
        </article>
    )
}

export default TestimonialCard;
