import CategoryGrid from '@/app/components/category-grid/category-grid'
import Masthead from '@/app/components/masthead/masthead'
import NoResults from '@/app/components/no-results/no-results'
import ProductDetails from '@/app/components/product-details/product-details'
import ProductsList from '@/app/components/products-list/products-list'
import Testimonials from '@/app/components/testimonials/testimonials'
import { LivePreviewListener } from '@/app/LivePreviewListener'
// import { getAllProductsHero } from '@/lib/globals/getAllProductsHero'
import { getProductBySlug } from '@/lib/products/getProductBySlug'
import { getProducts } from '@/lib/products/getProducts'
import { getProductsByCategory } from '@/lib/products/getProductsByCategory'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload';
import configPromise from '@/payload.config';

type Props = {
    params: {
        slug?: string[]
    }
}

export default async function ProductsPage({ params }: Props) {

    const { slug } = await params;

    // Fetch the global "Custom Payment & Delivery Text"
    const payload = await getPayload({ config: configPromise });
    const globalData = await payload.findGlobal({ slug: 'payment-delivery-details' });
    const defaultDeliveryText = globalData.customText;

    // 1. All Products
    if (!slug) {
        const allProducts = await getProducts();
        // const hero = await getAllProductsHero()

        console.log('allProducts:', allProducts);

        return (
            <>
                {/* <Masthead image={
                    typeof allProducts.image === 'object' && allProducts.image?.url
                        ? {
                            url: allProducts.image.url,
                            alt: allProducts.image.alt || allProducts.title,
                        }
                        : undefined
                } title={allProducts.title || 'All Products'} /> */}
                <ProductsList products={allProducts} />
                <CategoryGrid />
                <Testimonials />
            </>
        )
    }

    // 2. Category Page
    if (slug.length === 1) {
        const categorySlug = slug[0];

        const { category, products } = await getProductsByCategory(categorySlug);
        if (!category) return <NoResults content="Category not found" />

        return (
            <>
                <Masthead
                    image={
                        typeof category.image === 'object' && category.image?.url
                            ? {
                                url: category.image.url,
                                alt: category.image.alt || category.name,
                            }
                            : undefined
                    }
                    title={category.name}
                />

                {products.length > 0 ? (
                    <ProductsList products={products} />
                ) : (
                    <NoResults content={`No products in ${category.name}`} />
                )}
                <CategoryGrid />
                <Testimonials />
            </>
        )

    }

    // 3. Full Product Details
    if (slug.length === 2) {
        const [categorySlug, productSlug] = slug;

        const product = await getProductBySlug(productSlug)

        if (!product) return <NoResults content="Product not found" />

        const matchedCategory = product.category;

        if (!matchedCategory) {
            return <NoResults content="Category mismatch" />
        }

        return (
            <>
                <ProductDetails product={product} defaultDeliveryText={defaultDeliveryText} />
                <Testimonials />
            </>
        )

    }

    // fallback for invalid routes
    notFound()

}
