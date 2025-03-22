
import CategoryGrid from '@/components/category-grid/category-grid';
import Masthead from '@/components/masthead/masthead';
import NoResults from '@/components/no-results/no-results';
import ProductsList from '@/components/products-list/products-list';
import SectionHeader from '@/components/section-header/section-header';
import Testimonials from '@/components/testimonials/testimonials';
import productsData from '@/app/data/products.json';
import { categoryMap } from "@/app/lib/categoryMap";
import { ProductType } from '@/app/lib/types';

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

    const filteredProducts: ProductType[] = productsData.filter(
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
