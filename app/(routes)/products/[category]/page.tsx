
import CategoryGrid from '@/app/components/category-grid/category-grid';
import Masthead from '@/app/components/masthead/masthead';
import NoResults from '@/app/components/no-results/no-results';
import ProductsList from '@/app/components/products-list/products-list';
import SectionHeader from '@/app/components/section-header/section-header';
import Testimonials from '@/app/components/testimonials/testimonials';
import productsData from '@/app/data/products.json';
import { categoryMap } from "@/app/lib/categoryMap";
import { ProductListItemType } from '@/app/lib/types';

type CategoryPageProps = {
    params: Promise<Params>;
}

type Params = {
    category: string;
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
    const { category } = await params;

    const categoryName = categoryMap[category];

    if (!categoryName) {
        return <NoResults content="No category found" />;
    }

    const filteredProducts: ProductListItemType[] = productsData.filter(
        (product) => product.category === category
    );

    if (filteredProducts.length === 0) {
        return <NoResults content={`No products found in ${categoryName}`} />;
    }

    return (
        <>
            <Masthead title={categoryName || `Products`} />

            <ProductsList products={filteredProducts} />

            <CategoryGrid />

            <Testimonials />
        </>
    )
}

export default CategoryPage;
