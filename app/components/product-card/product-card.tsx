import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import styles from './product-card.module.scss';
import { ProductListItemType } from '@/app/lib/types';

type ProductCardProps = {
    product: ProductListItemType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { image, price, name, category, slug } = product;
    console.log('product', product)
    return (
        <Link href={`/products/${category}/${slug}`} className={styles.productCard}>
            <div className={styles.image}>
                <span className={styles.price}>£{price}</span>
                <Image src={image} alt={name} height={400} width={400} />
            </div>
            <p>
                {name}
            </p>
        </Link>
    )
};

export default ProductCard;
