import { CATEGORY_SLUGS } from "@/app/lib/constants";
export const categoryMap = {
    "Furniture": CATEGORY_SLUGS.FURNITURE,
    "Faux Florals & Upcycled Pots": CATEGORY_SLUGS.FAUX_FLORALS_POTS,
    "Home Decor Accessories": CATEGORY_SLUGS.HOME_DECOR_ACCESSORIES
};

// Reverse map: for getting category name from the slug
export const slugToCategoryMap = Object.fromEntries(
    Object.entries(categoryMap).map(([category, slug]) => [slug, category])
);
