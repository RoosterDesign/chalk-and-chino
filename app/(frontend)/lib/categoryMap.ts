import { CATEGORY_DETAILS } from "@/app/lib/constants";

export const categoryMap = Object.fromEntries(
    Object.values(CATEGORY_DETAILS).map(({ name, slug }) => [slug, name])
);
