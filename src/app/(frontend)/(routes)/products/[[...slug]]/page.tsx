// app/[...slug]/page.tsx
import type { Metadata } from "next";

import { draftMode } from "next/headers";

import Gallery from "@/app/components/gallery/gallery";
import NoResults from "@/app/components/no-results/no-results";
import ProductDetails from "@/app/components/product-details/product-details";
import ProductsList from "@/app/components/products-list/products-list";
import CategoryGridLoader from "@/blocks/CategoryGrid/Loader";
import Map from "@/blocks/Map/Component";
import MastheadBlock from "@/blocks/Masthead/Component";
import Testimonials from "@/blocks/Testimonials/Component";
import { getPaymentDeliveryDetails } from "@/lib/globals/getPaymentDeliveryDetails";
import { getPayloadClient } from "@/lib/payloadClient";
import { getProductBySlug } from "@/lib/products/getProductBySlug";
import { getProducts } from "@/lib/products/getProducts";
import { getProductsByCategory } from "@/lib/products/getProductsByCategory";
import { getAllProductsCategory } from "@/lib/products/getAllProductsCategory";

type PageParams = { slug?: string[] };
interface PageProps {
    params: Promise<PageParams>;
}

// ISR config
export const dynamic = "auto";
// Only re-render when Payload hooks call revalidatePath(...) for relevant /products routes
export const revalidate = false;

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const SITE = "Chalk & Chino";
    const DEF_DESC =
        "Browse our full range of upcycled furniture and home décor in Hucclecote, Gloucester—from faux florals and pots to bespoke tables.";

    let title: string;
    let description: string;

    if (!slug) {
        title = `All Products — ${SITE}`;
        description = DEF_DESC;
    } else if (slug.length === 1) {
        const { category } = await getProductsByCategory(slug[0]);
        if (!category) return {};
        title = `${category.name} — ${SITE}`;
        description = category.meta?.description?.trim() ?? DEF_DESC;
    } else {
        const product = await getProductBySlug(slug[1]);
        if (!product) return {};

        const rawTitle = product.meta?.title?.trim() ?? "";
        const baseTitle = rawTitle.length > 0 ? rawTitle : product.name;
        title = `${baseTitle} — ${SITE}`;

        const rawDesc = product.meta?.description?.trim() ?? "";
        description =
            rawDesc.length > 0
                ? rawDesc
                : (product.summary?.trim() ?? DEF_DESC);
    }

    return { title, description };
}

export async function generateStaticParams() {
    const payload = await getPayloadClient();

    const { docs: categories } = await payload.find({
        collection: "product-categories",
        pagination: false,
        select: { slug: true },
    });
    const { docs: products } = await payload.find({
        collection: "products",
        pagination: false,
        depth: 1,
        select: { slug: true, category: true },
    });

    return [
        { slug: [] },
        ...categories.map((c) => ({ slug: [c.slug] })),
        ...products
            .filter((p) => typeof p.category === "object" && p.category?.slug)
            .map((p) => ({
                slug: [
                    (p.category as { slug: string }).slug,
                    p.slug,
                ],
            })),
    ];
}

export default async function ProductsPage({ params }: PageProps) {
    const { slug } = await params;
    const { isEnabled: draft } = await draftMode();

    // Load all categories + the All Products global in parallel
    const [allProductsGlobal] = await Promise.all([getAllProductsCategory()]);

    // Extract title & image with fallbacks
    const allTitle =
        typeof allProductsGlobal?.title === "string" &&
        allProductsGlobal.title.trim()
            ? allProductsGlobal.title
            : "All Products";

    const allImage =
        allProductsGlobal?.image && typeof allProductsGlobal.image === "object"
            ? allProductsGlobal.image
            : undefined;

    // Payment & delivery global
    const deliveryGlobal = await getPaymentDeliveryDetails();
    const defaultDeliveryText = deliveryGlobal?.customText ?? "";

    // 1) All Products
    if (!slug) {
        const allProducts = await getProducts();

        return (
            <>
                {draft && <div>— Preview Mode —</div>}
                <MastheadBlock
                    blockType="masthead"
                    image={allImage}
                    title={allTitle}
                />
                <ProductsList products={allProducts} />
                <CategoryGridLoader title="Browse by Category" />
                <Testimonials />
            </>
        );
    }

    // 2) Category page
    if (slug.length === 1) {
        const { category, products } = await getProductsByCategory(slug[0]);
        if (!category) return <NoResults content="Category not found" />;

        return (
            <>
                {draft && <div>— Preview Mode —</div>}
                <MastheadBlock
                    blockType="masthead"
                    image={category.image}
                    title={category.name}
                />
                {products.length ? (
                    <ProductsList products={products} />
                ) : (
                    <NoResults content={`No products in ${category.name}`} />
                )}
                <CategoryGridLoader title="Browse by Category" />
                <Testimonials />
            </>
        );
    }

    // 3) Product detail page
    const product = await getProductBySlug(slug[1]);
    if (!product) return <NoResults content="Product not found" />;
    if (typeof product.category !== "object")
        return <NoResults content="Category mismatch" />;

    return (
        <>
            {draft && <div>— Preview Mode —</div>}
            <ProductDetails
                defaultDeliveryText={defaultDeliveryText}
                product={product}
            />
            {product.gallery && product.gallery.length > 0 && (
                <Gallery images={product.gallery} />
            )}
            <CategoryGridLoader title="Browse by Category" />
            <Testimonials />
            <Map />
        </>
    );
}
