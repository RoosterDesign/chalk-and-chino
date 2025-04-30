import type { CategoryType } from '@/lib/types';

import Carousel from '@/components/carousel/carousel';
import Container from '@/components/container/container';
import SectionHeader from '@/components/section-header/section-header';
import { getProductCategories } from '@/lib/products/getProductCategories';
import configPromise from '@/payload.config'
import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload'
import { Suspense } from 'react'

import styles from './category-grid.module.scss';

type CategoryNavItem = {
    image?: ImageType
    label: string
    url: string
}

type ImageType = {
    alt?: string
    url: string
}

const CategoryGrid: React.FC = async () => {

    const payload = await getPayload({ config: configPromise })

    const [categories, allProducts] = await Promise.all([
        getProductCategories({ withImages: true }),
        payload.findGlobal({ slug: 'all-products-category', depth: 1 }),
    ])

    const allItem: CategoryNavItem = {
        label: allProducts.title || 'All Products',
        url: '/products',
        image:
            typeof allProducts.image === 'object' && allProducts.image?.url
                ? {
                    url: allProducts.image.url,
                    alt: allProducts.image.alt || allProducts.title || 'All Products',
                }
                : undefined,
    }

    const categoryItems: CategoryNavItem[] = [allItem, ...categories]

    return (
        <section className={`${styles.categoryGrid} section-spacing`}>
            <Container>
                <SectionHeader title="Browse by Category" />
                <Suspense fallback={<p className="loading">Loading categories...</p>}>
                    <Carousel>
                        {categoryItems.map((category) => (
                            <Link
                                className={styles.categoryCard}
                                href={category.url}
                                key={category.url}
                                title={category.label}
                            >
                                <h3>{category.label}</h3>
                                <span className="btn btn--alt">View products</span>
                                {category.image?.url && (
                                    <Image
                                        alt={category.image.alt || category.label}
                                        height={350}
                                        src={category.image.url}
                                        width={710}
                                    />
                                )}
                            </Link>
                        ))}
                    </Carousel>
                </Suspense>
            </Container>
        </section>
    )
};

export default CategoryGrid
