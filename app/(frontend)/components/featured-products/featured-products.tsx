import Carousel from '@/components/carousel/carousel';
import Container from '@/components/container/container';
import ProductCard from '@/components/product-card/product-card';
import SectionHeader from '@/components/section-header/section-header';
import productsData from '@/app/data/products.json';
import { ProductType } from '@/app/lib/types';

import styles from './featured-products.module.scss';

const FeaturedProducts: React.FC = () => {

    const featuredProducts: ProductType[] = productsData
        .filter((product) => product.featured)
        .slice(0, 4);

    return (
        <section className={styles.featuredProducts}>
            <Container>
                <SectionHeader linkLabel="View all products" linkUrl="#" title="New Arrivals" />
                <Carousel>
                    {featuredProducts.map((product, index) => <ProductCard key={index} product={product} />)}
                </Carousel>

            </Container>
        </section>
    )
};

export default FeaturedProducts;
