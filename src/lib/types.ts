import type { Media } from "@/payload-types";

export type CategoryType = {
    image?: Media;
    label: string;
    url: string;
};

export type ImageExpanderType = {
    alt: string;
    className?: null | string;
    src: string;
    thumbHeight?: number;
    thumbSize?: string;
    thumbSrc: string;
    thumbWidth?: number;
};

export type NavItem = {
    children?: NavItem[];
    label: string;
    url: string;
};

export type ProductSpecification = {
    key: string;
    value: string;
};

export type ProductType = {
    category: string;
    description: string;
    featured: boolean;
    image: string;
    name: string;
    price: string;
    slug: string;
    specification: ProductSpecification[];
    synopsis: string;
};
