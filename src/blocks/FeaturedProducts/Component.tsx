import type { FeaturedProductsBlock as FeaturedProductsBlockProps } from '@/payload-types'
import Carousel from '@/app/components/carousel/carousel';
import Container from '@/app/components/container/container';
import ProductCard from '@/app/components/product-card/product-card';
import SectionHeader from '@/app/components/section-header/section-header';
import { isFullProduct } from '@/lib/utils/typeGuards'
// import productsData from '@/app/data/products.json';
// import { ProductType } from '@/lib/types';

import styles from './styles.module.scss';


export const FeaturedProductsBlock: React.FC<FeaturedProductsBlockProps> = ({ title, link, products }) => {

    const validProducts = products?.filter(isFullProduct) || []

    return (
        <section className={styles.featuredProducts}>
            <Container>
                <SectionHeader linkLabel={link.label} linkUrl={link.url} title={title || ''} />
                {validProducts.length > 0 && (
                    <Carousel>
                        {validProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </Carousel>
                )}
            </Container>
        </section>
    )
}
