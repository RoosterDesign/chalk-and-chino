import Container from '@/app/components/container/container';
import Carousel from '@/app/components/carousel/carousel';
import Card from '@/app/components/card/card';
import styles from './featured-products.module.scss';

type FeaturedProductsProps = {
    children: React.ReactNode;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ children }) => {
    return (
        <section className={styles.featuredProducts}>
            <Container>
                {children}
                <Carousel>
                    <Card
                        image="https://picsum.photos/400/500"
                        price="20.00"
                        title="Lovely lamp"
                        url="#" />
                    <Card
                        image="https://picsum.photos/400/500"
                        price="20.00"
                        title="Lovely lamp"
                        url="#" />
                    <Card
                        image="https://picsum.photos/400/500"
                        price="20.00"
                        title="Lovely lamp"
                        url="#" />
                    <Card
                        image="https://picsum.photos/400/500"
                        price="20.00"
                        title="Lovely lamp"
                        url="#" />
                </Carousel>

            </Container>
        </section>
    )
};

export default FeaturedProducts;
