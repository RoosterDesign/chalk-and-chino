import { Product, Testimonial } from '@/payload-types'

export const isFullProduct = (item: unknown): item is Product => {
    return typeof item === 'object' && item !== null && 'id' in item && 'name' in item
}

export const isFullTestimonial = (item: unknown): item is Testimonial => {
    return typeof item === 'object' && item !== null && 'id' in item && 'quote' in item;
};

export const isPublishedProduct = (item: unknown): item is Product => {
  return (
    isFullProduct(item) &&
    '_status' in item &&
    item._status === 'published'
  );
};
