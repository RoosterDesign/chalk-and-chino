import { ProductType } from '@/lib/types';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import styles from './product-card.module.scss';

type ProductCardProps = {
    product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { category, image, name, price, slug } = product;
    return (
        <Link className={styles.productCard} href={`/products/${category}/${slug}`}>
            <div className={styles.image}>
                <span className={styles.price}>£{price}</span>
                <Image alt={name} height={400} src={image} width={400} />
            </div>
            <p>
                {name}
            </p>
        </Link>
    )
};

export default ProductCard;
