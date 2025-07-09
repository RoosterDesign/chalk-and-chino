import Image from "next/image";
import Link from "next/link";

import { getProductCategorySlug } from "@/lib/products/getProductCategorySlug";
import { Product } from "@/payload-types";

import styles from "./product-card.module.scss";

type ProductCardProps = {
    product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const productUrl = `/products/${getProductCategorySlug(product)}/${product.slug}`;
    const productThumbnail =
        typeof product.heroImage === "object" &&
        product.heroImage?.sizes?.portrait &&
        product.heroImage?.sizes.portrait?.url &&
        typeof product.heroImage.sizes.portrait.width === "number" &&
        typeof product.heroImage.sizes.portrait.height === "number"
            ? product.heroImage.sizes.portrait
            : null;

    const altText =
        typeof product.heroImage === "object" && product.heroImage?.alt
            ? product.heroImage.alt
            : product.name || "";

    return (
        <Link className={styles.productCard} href={productUrl}>
            <div className={styles.image}>
                <span className={styles.price}>£{product.price}</span>
                {productThumbnail ? (
                    <Image
                        alt={altText}
                        height={productThumbnail.height!}
                        src={productThumbnail.url!}
                        width={productThumbnail.width!}
                    />
                ) : (
                    <Image
                        alt=""
                        height={500}
                        src="/no-thumbnail-list.png"
                        width={400}
                    />
                )}
            </div>
            <p>{product.name}</p>
        </Link>
    );
};

export default ProductCard;
