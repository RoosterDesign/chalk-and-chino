import type { Product, ProductCategory } from '@/payload-types'

export const getProductCategorySlug = (product: Product): string => {
    const category = product.category
    if (typeof category === 'object' && category !== null && 'slug' in category) {
        return category.slug || 'uncategorised'
    }

    return 'uncategorised'
}
