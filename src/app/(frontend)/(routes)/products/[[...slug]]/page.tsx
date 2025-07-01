import Gallery from "@/app/components/gallery/gallery";
import Masthead from "@/app/components/masthead/masthead";
import NoResults from "@/app/components/no-results/no-results";
import ProductDetails from "@/app/components/product-details/product-details";
import ProductsList from "@/app/components/products-list/products-list";
import CategoryGridLoader from "@/blocks/CategoryGrid/Loader";
import Map from "@/blocks/Map/Component";
import Testimonials from "@/blocks/Testimonials/Component";
import { getAllProductsCategory } from "@/lib/products/getAllProductsCategory";
import { getProductBySlug } from "@/lib/products/getProductBySlug";
import { getProducts } from "@/lib/products/getProducts";
import { getProductsByCategory } from "@/lib/products/getProductsByCategory";
import { getImageData } from "@/lib/utils/getImageData";
import configPromise from "@/payload.config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

type PageParams = {
    slug?: string;
};

type Props = {
    params: Promise<PageParams>;
};

export default async function ProductsPage({ params }: Props) {
    const { slug } = await params;

    // Fetch the global "Custom Payment & Delivery Text"
    const payload = await getPayload({ config: configPromise });
    const globalData = await payload.findGlobal({
        slug: "payment-delivery-details",
    });
    const defaultDeliveryText = globalData.customText;

    // 1. All Products
    if (!slug) {
        const allProducts = await getProducts();
        const allProductsCategory = await getAllProductsCategory();

        return (
            <>
                <Masthead
                    image={getImageData(
                        allProductsCategory.image,
                        allProductsCategory.title ?? undefined
                    )}
                    title={allProductsCategory.title ?? "All Products"}
                />
                <ProductsList products={allProducts} />
                <CategoryGridLoader />
                <Testimonials />
            </>
        );
    }

    // 2. Category Page
    if (slug.length === 1) {
        const categorySlug = slug[0];

        const { category, products } =
            await getProductsByCategory(categorySlug);
        if (!category) return <NoResults content="Category not found" />;

        return (
            <>
                <Masthead
                    image={getImageData(category.image, category.name)}
                    title={category.name}
                />
                {products.length > 0 ? (
                    <ProductsList products={products} />
                ) : (
                    <NoResults content={`No products in ${category.name}`} />
                )}
                <CategoryGridLoader />
                <Testimonials />
            </>
        );
    }

    // 3. Full Product Details
    if (slug.length === 2) {
        const [categorySlug, productSlug] = slug;

        const product = await getProductBySlug(productSlug);

        if (!product) return <NoResults content="Product not found" />;

        const matchedCategory = product.category;

        if (!matchedCategory) {
            return <NoResults content="Category mismatch" />;
        }

        return (
            <>
                <ProductDetails
                    defaultDeliveryText={defaultDeliveryText}
                    product={product}
                />
                {Array.isArray(product.gallery) &&
                    product.gallery.length > 0 && (
                        <Gallery images={product.gallery} />
                    )}
                <Testimonials />
                <Map />
            </>
        );
    }

    // fallback for invalid routes
    notFound();
}
