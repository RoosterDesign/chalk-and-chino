import Masthead from '@/components/masthead/masthead';
import ProductsList from '@/components/products-list/products-list';
import SectionHeader from '@/components/section-header/section-header';
import Testimonials from '@/components/testimonials/testimonials';
import productsData from '@/data/products.json';
import { ProductType } from '@/lib/types';

const Products: React.FC = () => {
    const products: ProductType[] = productsData;

    return (
        <>
            <Masthead title="Products" />
            <ProductsList products={products} />
            <Testimonials />
        </>
    )
}

export default Products;
