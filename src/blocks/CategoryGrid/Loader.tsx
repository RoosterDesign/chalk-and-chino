import { getProductCategories } from '@/lib/products/getProductCategories';
import configPromise from '@/payload.config';
import { getPayload } from 'payload';

import CategoryGridBlock from './Component';

type LoaderProps = {
    title?: string;
}

const CategoryGridLoader = async ({ title }: LoaderProps) => {
    const payload = await getPayload({ config: configPromise })

    const [categories, allProducts] = await Promise.all([
        getProductCategories({ withImages: true }),
        payload.findGlobal({ slug: 'all-products-category', depth: 1 }),
    ])

    const allItem = {
        label: allProducts.title || 'All Products',
        url: '/products',
        image: allProducts.image && typeof allProducts.image === 'object' ? allProducts.image : undefined,
    }

    const categoryItems = [allItem, ...categories]

    return <CategoryGridBlock categories={categoryItems} title={title ?? 'Browse by Category'} />;

};

export default CategoryGridLoader;
