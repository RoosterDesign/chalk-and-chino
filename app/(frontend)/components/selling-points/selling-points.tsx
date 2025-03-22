import Carousel from '@/components/carousel/carousel';
import Container from '@/components/container/container';

import styles from './selling-points.module.scss';

const SellingPoints: React.FC = () => {
    return (
        <section className={styles.sellingPoints}>
            <Container>
                <Carousel mobileGap="" tabletGap="">
                    <dl>
                        <dt>Sustainable Craftsmanship</dt>
                        <dd>Class aptent taciti sociosqu ad litora torquent per conubia nostra.</dd>
                    </dl>
                    <dl>
                        <dt>Unique Character</dt>
                        <dd>Class aptent taciti sociosqu ad litora torquent per conubia nostra.</dd>
                    </dl>
                    <dl>
                        <dt>Quality You Can Trust</dt>
                        <dd>Class aptent taciti sociosqu ad litora torquent per conubia nostra.</dd>
                    </dl>
                    <dl>
                        <dt>Custom Finishes</dt>
                        <dd>Class aptent taciti sociosqu ad litora torquent per conubia nostra.</dd>
                    </dl>
                </Carousel>
            </Container>
        </section>
    )
}

export default SellingPoints;
