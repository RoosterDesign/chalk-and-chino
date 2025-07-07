// app/(frontend)/(routes)/products/[[...slug]]/page.tsx
import type { Metadata } from "next";

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

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

type PageParams = { slug?: string[] };

// Page components in Next.js 15 receive params as a Promise
interface PageProps {
    params: Promise<PageParams>;
}

// Opt into dynamic so draftMode() works
export const dynamic = "force-dynamic";

// Fallback constants
const SITE_NAME = "Chalk & Chino";
const DEFAULT_DESCRIPTION =
    "Chalk & Chino: bespoke furniture upcycling transforming old pieces into sustainable works of art.";
const FALLBACK_IMAGE_URL =
    "https://www.chalkandchino.co.uk/default-share-image.jpg";

// 1️⃣ Accept async params here too and await them
export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug = "homepage" } = await params;

    let title: string;
    let description: string;
    let images: { height?: number; url: string; width?: number }[];

    if (!slug) {
        // All-products listing
        const allCat = await getAllProductsCategory();
        const base =
            (allCat as any).meta?.title ?? allCat.title ?? "All Products";
        title = `${base} – ${SITE_NAME}`;
        description = (allCat as any).meta?.description ?? DEFAULT_DESCRIPTION;

        const rawImg = (allCat as any).meta?.image ?? allCat.image;
        const img = rawImg && typeof rawImg !== "number" ? rawImg : undefined;
        images = img?.url
            ? [
                  {
                      url: img.url,
                      width:
                          typeof img.width === "number" ? img.width : undefined,
                      height:
                          typeof img.height === "number"
                              ? img.height
                              : undefined,
                  },
              ]
            : [{ url: FALLBACK_IMAGE_URL }];
    } else if (slug.length === 1) {
        // Category page
        const { category } = await getProductsByCategory(slug[0]);
        if (!category) return {};

        const base = (category as any).meta?.title ?? category.name;
        title = `${base} – ${SITE_NAME}`;
        description =
            (category as any).meta?.description ?? DEFAULT_DESCRIPTION;

        const rawImg = (category as any).meta?.image ?? category.image;
        const img = rawImg && typeof rawImg !== "number" ? rawImg : undefined;
        images = img?.url
            ? [
                  {
                      url: img.url,
                      width:
                          typeof img.width === "number" ? img.width : undefined,
                      height:
                          typeof img.height === "number"
                              ? img.height
                              : undefined,
                  },
              ]
            : [{ url: FALLBACK_IMAGE_URL }];
    } else if (slug.length === 2) {
        // Product detail page
        const product = await getProductBySlug(slug[1]);
        if (!product) return {};

        const base = product.meta?.title ?? product.name;
        title = `${base} – ${SITE_NAME}`;
        description = product.meta?.description ?? DEFAULT_DESCRIPTION;

        const rawImg = product.meta?.image;
        const img = rawImg && typeof rawImg !== "number" ? rawImg : undefined;
        images = img?.url
            ? [
                  {
                      url: img.url,
                      width:
                          typeof img.width === "number" ? img.width : undefined,
                      height:
                          typeof img.height === "number"
                              ? img.height
                              : undefined,
                  },
              ]
            : [{ url: FALLBACK_IMAGE_URL }];
    } else {
        // Unknown route shape
        return {};
    }

    return {
        title,
        description,
        openGraph: { title, description, images },
    };
}

export default async function ProductsPage({ params }: PageProps) {
    // 2️⃣ Still await params in the page component
    const { slug } = await params;
    const { isEnabled: draft } = await draftMode();

    // Fetch global payment & delivery copy
    const payload = await getPayload({ config: configPromise });
    const globalData = await payload.findGlobal({
        slug: "payment-delivery-details",
    });
    const defaultDeliveryText = globalData.customText;

    if (!slug) {
        const allProducts = await getProducts();
        const allProductsCategory = await getAllProductsCategory();
        return (
            <>
                {draft && <div>— Preview Mode —</div>}
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

    if (slug.length === 1) {
        const { category, products } = await getProductsByCategory(slug[0]);
        if (!category) return <NoResults content="Category not found" />;
        return (
            <>
                {draft && <div>— Preview Mode —</div>}
                <Masthead
                    image={getImageData(category.image, category.name)}
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

    if (slug.length === 2) {
        const product = await getProductBySlug(slug[1]);
        if (!product) return <NoResults content="Product not found" />;
        if (!product.category) return <NoResults content="Category mismatch" />;
        return (
            <>
                {draft && <div>— Preview Mode —</div>}
                <ProductDetails
                    defaultDeliveryText={defaultDeliveryText}
                    product={product}
                />
                {product.gallery && product.gallery?.length > 0 && (
                    <Gallery images={product.gallery} />
                )}
                <Testimonials />
                <Map />
            </>
        );
    }

    notFound();
}
