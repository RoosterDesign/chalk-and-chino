import CategoryGrid from '@/app/components/category-grid/category-grid';
import NoResults from '@/app/components/no-results/no-results';
import Testimonials from '@/app/components/testimonials/testimonials';
import Container from '@/components/container/container'
import Masthead from '@/components/masthead/masthead'
import ProductsList from '@/components/products-list/products-list'
import { getProducts } from '@/lib/products/getProducts'
import configPromise from '@/payload.config'
import { getPayload } from 'payload'

const ProductsPage = async () => {

    const payload = await getPayload({ config: configPromise })

    const allProducts = await payload.findGlobal({
        slug: 'all-products',
        depth: 1
    })

    const products = await getProducts()

    return (
        <>
            <Masthead image={
                typeof allProducts.image === 'object' && allProducts.image?.url
                    ? {
                        url: allProducts.image.url,
                        alt: allProducts.image.alt || allProducts.title,
                    }
                    : undefined
            } title={allProducts.title || 'All Products'} />

            {products.length > 0 ? (
                <ProductsList products={products} />
            ) : (
                <NoResults content={`No products found.`} />
            )}

            <CategoryGrid />
            <Testimonials />

        </>
    )
}

export default ProductsPage
