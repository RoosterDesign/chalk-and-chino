import Masthead from '@/app/components/masthead/masthead';
import SectionHeader from '@/app/components/section-header/section-header';
import Testimonials from '@/app/components/testimonials/testimonials';
import ProductsList from '@/app/components/products-list/products-list';
import NoResults from '@/app/components/no-results/no-results';
import { ProductListItemType } from '@/app/lib/types';
import productsData from '@/app/data/products.json';
import { slugToCategoryMap } from "@/app/lib/categoryMap"; 0

type Params = {
    category: string;
}

type CategoryPageProps = {
    params: Promise<Params>;
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
    const { category } = await params;

    const categoryName = slugToCategoryMap[category];

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

            {/* {filteredProducts.length === 0 && <div><h1>No products found</h1></div>} */}

            <ProductsList products={filteredProducts} />

            <Testimonials>
                <SectionHeader title="Testimonials" intro="See what our happy customers have to say about our upcycled furniture and personalised service." centered />
            </Testimonials>
        </>
    )
}

export default CategoryPage;
