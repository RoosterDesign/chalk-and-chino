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

    // const { category, image, name, price, slug } = product;
    return (
        <Link className={styles.productCard} href={productUrl}>
            <div className={styles.image}>
                <span className={styles.price}>£{product.price}</span>
                {typeof product.heroImage === 'object' && product.heroImage?.url && (
                    <Image
                        alt={product.heroImage.alt || product.name}
                        height={500}
                        src={product.heroImage.url}
                        width={390}
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
