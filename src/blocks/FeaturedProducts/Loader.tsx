import type { FeaturedProductsBlock as FeaturedProductsBlockProps, Product } from "@/payload-types";

import { getLatestProducts } from "@/lib/products/getLatestProducts";
import { isFullProduct } from "@/lib/utils/typeGuards";

import FeaturedProductsBlock from "./Component";

const TOTAL_PRODUCTS = 4;

type LoaderProps = FeaturedProductsBlockProps;

const FeaturedProductsLoader = async (props: LoaderProps) => {
    const { products: selectedProducts, ...rest } = props;

    // Filter to only fully populated products
    const manualProducts = (selectedProducts?.filter(isFullProduct) || []) as Product[];
    const manualCount = manualProducts.length;

    // Calculate how many more products we need to fill up to 4
    const needed = TOTAL_PRODUCTS - manualCount;

    let finalProducts: Product[] = manualProducts;

    if (needed > 0) {
        // Get IDs of manually selected products to exclude them from latest
        const excludeIds = manualProducts.map((p) => p.id);

        // Fetch additional latest products, excluding manually selected ones
        const latestProducts = await getLatestProducts(needed, excludeIds);

        // Combine: manual products first, then fill with latest
        finalProducts = [...manualProducts, ...latestProducts];
    }

    return <FeaturedProductsBlock {...rest} products={finalProducts} />;
};

export default FeaturedProductsLoader;
