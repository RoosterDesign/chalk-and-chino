import Masthead from '@/app/components/masthead/masthead';
import SectionHeader from '@/app/components/section-header/section-header';
import Testimonials from '@/app/components/testimonials/testimonials';
import ProductsList from '@/app/components/products-list/products-list';
import { ProductListItemType } from '@/app/lib/types';
import productsData from '@/app/data/products.json';

const Products: React.FC = () => {
    const products: ProductListItemType[] = productsData;

    return (
        <>
            <Masthead title="Products" />

            <ProductsList products={products} />


            <Testimonials>
                <SectionHeader title="Testimonials" intro="See what our happy customers have to say about our upcycled furniture and personalised service." centered />
            </Testimonials>
        </>
    )
}

export default Products;
