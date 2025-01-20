'use client';
import Container from '@/app/components/container/container';
import ImageExpander from '@/app/components/image-expander/image-expander';
import { ProductListItemType } from '@/app/lib/types';
import Link from 'next/link';

import styles from './product-details.module.scss';

type ProductDetailsType = {
    product: ProductListItemType
}

const image = {
    alt: 'Image 1', height: 1400, src: 'https://picsum.photos/1400/1400', thumbHeight: 790, thumbWidth: 940, width: 1400
}

const ProductDetails: React.FC<ProductDetailsType> = ({ product }) => {
    return (
        <section className={styles.productDetails}>
            <Container className={styles.container}>

                <ImageExpander alt={image.alt}
                    height={image.height}
                    src={image.src}
                    thumbHeight={image.thumbHeight}
                    thumbWidth={image.thumbWidth}
                    width={image.width}
                />

                <div className={styles.details}>
                    <Link href="#" title="">CATEGORY</Link>
                    <h1>Product Details - {product.name}</h1>
                </div>

            </Container>
        </section>
    )
}

export default ProductDetails;
