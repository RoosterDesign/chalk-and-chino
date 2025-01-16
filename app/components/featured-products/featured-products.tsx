import Container from '@/app/components/container/container';
import Carousel from '@/app/components/carousel/carousel';
import ProductCard from '@/app/components/product-card/product-card';
import { ProductListItemType } from '@/app/lib/types';
import productsData from '@/app/data/products.json';
import styles from './featured-products.module.scss';

type FeaturedProductsProps = {
    children: React.ReactNode;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ children }) => {

    const featuredProducts: ProductListItemType[] = productsData
        .filter((product) => product.featured)
        .slice(0, 4);

    return (
        <section className={styles.featuredProducts}>
            <Container>
                {children}
                <Carousel>
                    {featuredProducts.map((product, index) => <ProductCard key={index} product={product} />)}
                </Carousel>

            </Container>
        </section>
    )
};

export default FeaturedProducts;
