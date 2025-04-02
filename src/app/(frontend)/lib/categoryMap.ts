import { CATEGORY_DETAILS } from "@/lib/constants";

export const categoryMap = Object.fromEntries(
    Object.values(CATEGORY_DETAILS).map(({ name, slug }) => [slug, name])
);
