import { getRandomProducts } from "@/lib/products/getRandomProducts";

import FeaturedProductsBlock from "./Component";

const TOTAL_PRODUCTS = 4;

type LoaderProps = {
    excludeProductId: number;
    title?: string;
};

/**
 * The featured products block, fed a random selection rather than a manual or
 * latest-first one. Used on the product page to surface other stock.
 */
const RelatedProductsLoader = async ({
    excludeProductId,
    title = "You may also like",
}: LoaderProps) => {
    const products = await getRandomProducts(TOTAL_PRODUCTS, [
        excludeProductId,
    ]);

    // Nothing to suggest on a one-product catalogue.
    if (products.length === 0) return null;

    return (
        <FeaturedProductsBlock
            blockType="featuredProducts"
            products={products}
            sectionHeader={{ title }}
        />
    );
};

export default RelatedProductsLoader;
