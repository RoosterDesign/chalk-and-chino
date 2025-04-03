import Container from '@/app/components/container/container';
import ProductCard from '@/app/components/product-card/product-card';
import { ProductType } from '@/app/lib/types';

import styles from './products-list.module.scss';

type ProdcutsListType = {
    products: ProductType[];
}

const ProductsList: React.FC<ProdcutsListType> = ({ products }) => {
    return (
        <section className={`${styles.productsList} section-spacing section-spacing--top`}>
            <Container className={styles.container}>
                {products.map((product, index) => <ProductCard key={index} product={product} />)}
            </Container>
        </section>
    )
}

export default ProductsList;
