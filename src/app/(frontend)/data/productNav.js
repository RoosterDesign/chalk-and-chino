import { CATEGORY_DETAILS } from "@/lib/constants";

export const productNavItems = [
    {
        label: "All products",
        url: "/products",
    },
    {
        label: "Furniture",
        url: `/products/${CATEGORY_DETAILS.furniture.slug}`,
    },
    {
        label: "Faux florals & upcycled pots",
        url: `/products/${CATEGORY_DETAILS.fauxFloralsPots.slug}`,
    },
    {
        label: "Home decor accessories",
        url: `/products/${CATEGORY_DETAILS.homeDecorAccessories.slug}`,
    },
];
