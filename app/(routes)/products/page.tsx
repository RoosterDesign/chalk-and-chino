import Masthead from '@/app/components/masthead/masthead';
import ProductsList from '@/app/components/products-list/products-list';
import SectionHeader from '@/app/components/section-header/section-header';
import Testimonials from '@/app/components/testimonials/testimonials';
import productsData from '@/app/data/products.json';
import { ProductListItemType } from '@/app/lib/types';

const Products: React.FC = () => {
    const products: ProductListItemType[] = productsData;

    return (
        <>
            <Masthead title="Products" />
            <ProductsList products={products} />
            <Testimonials />
        </>
    )
}

export default Products;
