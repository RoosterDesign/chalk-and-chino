import { getProductCategories } from "@/lib/products/getProductCategories";
import { getAllProductsCategory } from "@/lib/products/getAllProductsCategory";

import CategoryGridBlock from "./Component";

type LoaderProps = {
    title?: string;
};

const CategoryGridLoader = async ({ title }: LoaderProps) => {
    const [categories, allProducts] = await Promise.all([
        getProductCategories({ withImages: true }),
        getAllProductsCategory(),
    ]);

    const allItem = {
        label: allProducts.title || "All Products",
        url: "/products",
        image:
            allProducts.image && typeof allProducts.image === "object"
                ? allProducts.image
                : undefined,
    };

    const categoryItems = [allItem, ...categories];

    return (
        <CategoryGridBlock
            categories={categoryItems}
            title={title ?? "Browse by Category"}
        />
    );
};

export default CategoryGridLoader;
