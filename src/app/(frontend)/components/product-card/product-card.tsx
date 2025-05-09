import { getProductCategorySlug } from '@/lib/products/getProductCategorySlug'
import { Product } from '@/payload-types'
import Image from 'next/image';
import Link from 'next/link';

import styles from './product-card.module.scss';

type ProductCardProps = {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const productUrl = `/products/${getProductCategorySlug(product)}/${product.slug}`
    const productThumbnail =
        typeof product.heroImage === 'object' &&
            product.heroImage?.sizes?.productThumbnail &&
            product.heroImage?.sizes.productThumbnail?.url &&
            typeof product.heroImage.sizes.productThumbnail.width === 'number' &&
            typeof product.heroImage.sizes.productThumbnail.height === 'number'
            ? product.heroImage.sizes.productThumbnail
            : null

    const altText =
        typeof product.heroImage === 'object' && product.heroImage?.alt
            ? product.heroImage.alt
            : product.name || '';

    return (
        <Link className={styles.productCard} href={productUrl}>
            <div className={styles.image}>
                <span className={styles.price}>£{product.price}</span>
                {productThumbnail && (
                    <Image
                        alt={altText}
                        height={productThumbnail.height!}
                        src={productThumbnail.url!}
                        width={productThumbnail.width!}
                    />
                )}
            </div>
            <p>
                {product.name}
            </p>
        </Link >
    )
};

export default ProductCard;
