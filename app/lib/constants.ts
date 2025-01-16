export const CATEGORY_SLUGS = {
    FURNITURE: "furniture",
    FAUX_FLORALS_POTS: "faux-florals-pots",
    HOME_DECOR_ACCESSORIES: "home-decor-accessories",
} as const;

export type CategorySlug = typeof CATEGORY_SLUGS[keyof typeof CATEGORY_SLUGS];
