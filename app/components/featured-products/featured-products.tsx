import Container from '@/app/components/container/container';
import Carousel from '@/app/components/carousel/carousel';
import SectionHeader from '@/app/components/section-header/section-header';
import Card from '@/app/components/card/card';
import styles from './featured-products.module.scss';

type Props = {
    title: string;
    linkLabel?: string;
    linkUrl?: string;
}

const FeaturedProducts: React.FC<Props> = ({ title, linkLabel, linkUrl }) => {
    return (
        <section className={styles.featuredProducts}>
            <Container>
                <SectionHeader title={title} linkLabel={linkLabel} linkUrl={linkUrl} />
                <Carousel>
                    <Card
                        image="https://picsum.photos/400/400"
                        price="20.00"
                        title="Lovely lamp"
                        url="#" />
                    <Card
                        image="https://picsum.photos/400/400"
                        price="20.00"
                        title="Lovely lamp"
                        url="#" />
                    <Card
                        image="https://picsum.photos/400/400"
                        price="20.00"
                        title="Lovely lamp"
                        url="#" />
                    <Card
                        image="https://picsum.photos/400/400"
                        price="20.00"
                        title="Lovely lamp"
                        url="#" />
                </Carousel>

            </Container>
        </section>
    )
};

export default FeaturedProducts;
