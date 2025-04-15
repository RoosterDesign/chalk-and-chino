import Carousel from '@/app/components/carousel/carousel';
import Container from '@/app/components/container/container';
import ProductCard from '@/app/components/product-card/product-card';
import SectionHeader from '@/app/components/section-header/section-header';
import productsData from '@/app/data/products.json';
import { ProductType } from '@/lib/types';

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
