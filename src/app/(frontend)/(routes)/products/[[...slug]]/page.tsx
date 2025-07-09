// app/[...slug]/page.tsx
import type { Metadata } from "next";

import { draftMode } from "next/headers";
import { getPayload } from "payload";

import Gallery from "@/app/components/gallery/gallery";
import NoResults from "@/app/components/no-results/no-results";
import ProductDetails from "@/app/components/product-details/product-details";
import ProductsList from "@/app/components/products-list/products-list";
import CategoryGridLoader from "@/blocks/CategoryGrid/Loader";
import Map from "@/blocks/Map/Component";
import MastheadBlock from "@/blocks/Masthead/Component";
import Testimonials from "@/blocks/Testimonials/Component";
import { getProductBySlug } from "@/lib/products/getProductBySlug";
import { getProducts } from "@/lib/products/getProducts";
import { getProductsByCategory } from "@/lib/products/getProductsByCategory";
import configPromise from "@/payload.config";

type PageParams = { slug?: string[] };
interface PageProps {
    params: Promise<PageParams>;
}

// ISR config
export const dynamic = "auto";
export const revalidate = 60;

// SEO metadata (only title & description)
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
        // All Products
        title = `All Products — ${SITE} (Hucclecote, Gloucester)`;
        description = DEF_DESC;
    } else if (slug.length === 1) {
        // Category
        const { category } = await getProductsByCategory(slug[0]);
        if (!category) return {};

        title = `${category.name} – ${SITE}`;
        description = category.meta?.description ?? DEF_DESC;
    } else {
        // Product Detail
        const product = await getProductBySlug(slug[1]);
        if (!product) return {};

        const rawTitle = product.meta?.title?.trim() ?? "";
        const baseTitle = rawTitle.length > 0 ? rawTitle : product.name;
        title = `${baseTitle} – ${SITE}`;

        // Description: fall back first to summary, then to DEF_DESC
        const rawDesc = product.meta?.description?.trim() ?? "";
        const baseDesc =
            rawDesc.length > 0
                ? rawDesc
                : (product.summary?.trim() ?? DEF_DESC);
        description = baseDesc;
    }

    return {
        title,
        description,
    };
}

// Pre-generate paths
export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise });

    const { docs: categories } = await payload.find({
        collection: "product-categories",
        pagination: false,
        select: { slug: true },
    });

    const { docs: products } = await payload.find({
        collection: "products",
        pagination: false,
        select: { slug: true, category: true },
    });

    return [
        { slug: [] },
        ...categories.map((c) => ({ slug: [c.slug] })),
        ...products.map((p) => ({ slug: [String(p.category), p.slug] })),
    ];
}

// Page component
export default async function ProductsPage({ params }: PageProps) {
    const { slug } = await params;
    const { isEnabled: draft } = await draftMode();

    // Global payment & delivery text
    const payload = await getPayload({ config: configPromise });
    const globalData = await payload.findGlobal({
        slug: "payment-delivery-details",
    });
    const defaultDeliveryText = globalData.customText || "";

    // 1) All Products
    if (!slug) {
        const allProducts = await getProducts();
        const { category: allCat } = await getProductsByCategory("all");

        return (
            <>
                {draft && <div>— Preview Mode —</div>}
                <MastheadBlock
                    blockType="masthead"
                    image={allCat?.image}
                    title={allCat?.name || "All Products"}
                />
                <ProductsList products={allProducts} />
                <CategoryGridLoader />
                <Testimonials />
            </>
        );
    }

    // 2) Category
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
                <CategoryGridLoader />
                <Testimonials />
            </>
        );
    }

    // 3) Product Detail
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
            <Testimonials />
            <Map />
        </>
    );
}
