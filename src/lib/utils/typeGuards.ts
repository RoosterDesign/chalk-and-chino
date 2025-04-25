import { Product } from '@/payload-types'

export const isFullProduct = (item: unknown): item is Product => {
    return typeof item === 'object' && item !== null && 'id' in item && 'name' in item
}
