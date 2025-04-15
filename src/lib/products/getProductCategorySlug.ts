import type { Product, ProductCategory } from '@/payload-types'

export const getProductCategorySlug = (product: Product): string => {
    const firstCategory = Array.isArray(product.categories)
        ? product.categories.find(
            (cat): cat is ProductCategory => typeof cat === 'object' && cat !== null && 'slug' in cat
        )
        : null

    return firstCategory?.slug || 'uncategorised'
}
