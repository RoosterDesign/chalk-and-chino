
import CategoryGrid from '@/app/components/category-grid/category-grid';
import Masthead from '@/app/components/masthead/masthead';
import NoResults from '@/app/components/no-results/no-results';
import ProductsList from '@/app/components/products-list/products-list';
import Testimonials from '@/app/components/testimonials/testimonials';
import { getProductsByCategory } from '@/lib/products/getProductsByCategory'

type Props = {
    params: {
        categorySlug: string
    }
}
const CategoryPage: React.FC<Props> = async ({ params }) => {
    const { categorySlug } = params
    const { category, products } = await getProductsByCategory(categorySlug)

    if (!category) {
        return <NoResults content="No category found" />
    }

    return (
        <>
            <Masthead
                image={
                    typeof category.image === 'object' && category.image !== null
                        ? {
                            url: category.image.url || undefined,
                            alt: category.image.alt || category.name,
                        }
                        : undefined
                }
                title={category.name || 'Products'}
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

export default CategoryPage;
