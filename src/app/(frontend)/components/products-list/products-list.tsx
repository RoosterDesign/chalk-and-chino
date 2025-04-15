import Container from '@/app/components/container/container';
import ProductCard from '@/app/components/product-card/product-card';
import { Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

import styles from './products-list.module.scss';

type Props = {
    products: Product[];
}

const ProductsList: React.FC<Props> = ({ products }) => {

    return (
        <section className={`${styles.productsList} section-spacing section-spacing--top`}>
            <Container className={styles.container}>
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />

                    // <Link href={`/products/${product.categories?.[0]?.slug}/${product.slug}`} key={product.id}>
                    //     {typeof product.heroImage === 'object' && product.heroImage?.url && (
                    //         <Image
                    //             alt={product.heroImage.alt || product.name}
                    //             height={300}
                    //             src={product.heroImage.url}
                    //             width={400}
                    //         />
                    //     )}
                    //     <h2>{product.name}</h2>
                    //     <p>£{product.price}</p>
                    //     {Array.isArray(product.categories) &&
                    //         product.categories.map((cat) =>
                    //             typeof cat === 'object' ? <small key={cat.id}>{cat.name}</small> : null
                    //         )}
                    // </Link>
                ))}
                {/* {products.map((product, index) => <ProductCard key={index} product={product} />)} */}
            </Container>
        </section>
    )
}

export default ProductsList;
