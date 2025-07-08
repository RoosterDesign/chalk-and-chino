import type { Metadata } from "next";

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

import type {
    ProductCategory as CategoryType,
    Media,
    Product as ProductType,
} from "@/payload-types";

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
import { getImageData } from "@/lib/utils/getImageData";
import configPromise from "@/payload.config";

type PageParams = { slug?: string[] };
interface PageProps {
    params: Promise<PageParams>;
}

// ── ISR CONFIG ──
export const dynamic = "auto";
export const revalidate = 60;

// ── SEO METADATA ──
export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;

    const SITE = "Chalk & Chino";
    const DEF_DESC =
        "Browse our full range of upcycled furniture and home décor in Hucclecote, Gloucester—from faux florals and pots to bespoke tables.";
    const FALLBACK_IMG =
        "https://www.chalkandchino.co.uk/default-share-image.jpg";

    let title: string;
    let description: string;
    let images: { height?: number; url: string; width?: number }[];

    if (!slug) {
        // All Products
        title = `All Products — ${SITE} (Hucclecote, Gloucester)`;
        description = DEF_DESC;
        images = [{ url: FALLBACK_IMG }];
    } else if (slug.length === 1) {
        // Category
        const { category } = await getProductsByCategory(slug[0]);
        if (!category) return {};

        title = `${category.name} – ${SITE}`;
        description = category.meta?.description ?? DEF_DESC;

        const rawImg = category.meta?.image ?? category.image;
        if (typeof rawImg !== "number" && rawImg?.url) {
            images = [
                {
                    url: rawImg.url,
                    width: rawImg.width ?? undefined,
                    height: rawImg.height ?? undefined,
                },
            ];
        } else {
            images = [{ url: FALLBACK_IMG }];
        }
    } else {
        // Product Detail
        const product = await getProductBySlug(slug[1]);
        if (!product) return {};

        title = `${product.meta?.title ?? product.name} – ${SITE}`;
        description = product.meta?.description ?? DEF_DESC;

        const rawImg = product.meta?.image;
        if (typeof rawImg !== "number" && rawImg?.url) {
            images = [
                {
                    url: rawImg.url,
                    width: rawImg.width ?? undefined,
                    height: rawImg.height ?? undefined,
                },
            ];
        } else {
            images = [{ url: FALLBACK_IMG }];
        }
    }

    return {
        title,
        description,
        openGraph: { title, description, images },
    };
}

// ── PRE-GENERATE PATHS ──
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
        ...products.map((p) => ({
            slug: [String(p.category), p.slug],
        })),
    ];
}

// ── PAGE COMPONENT ──
export default async function ProductsPage({ params }: PageProps) {
    const { slug } = await params;
    const { isEnabled: draft } = await draftMode();

    // Global payment & delivery text
    const payload = await getPayload({ config: configPromise });
    const globalData = await payload.findGlobal({
        slug: "payment-delivery-details",
    });
    const defaultDeliveryText = globalData.customText;

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
