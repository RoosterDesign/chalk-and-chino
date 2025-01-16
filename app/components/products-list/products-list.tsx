import styles from './products-list.module.scss';
import { ProductListItemType } from '@/app/lib/types';
import Container from '@/app/components/container/container';
import ProductCard from '@/app/components/product-card/product-card';

type ProdcutsListType = {
    products: ProductListItemType[];
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
