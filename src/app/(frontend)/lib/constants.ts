export const CATEGORY_DETAILS = {
    fauxFloralsPots: { name: "Faux Florals & Upcycled Pots", slug: "faux-florals-pots" },
    furniture: { name: "Furniture", slug: "furniture" },
    homeDecorAccessories: { name: "Home Decor Accessories", slug: "home-decor-accessories" },
} as const;

export type CategoryKey = keyof typeof CATEGORY_DETAILS;
export type CategorySlug = typeof CATEGORY_DETAILS[CategoryKey]["slug"];
