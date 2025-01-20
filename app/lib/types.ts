export type ImageExpanderType = {
    alt: string;
    className?: null | string;
    height: number;
    src: string;
    thumbHeight?: number;
    thumbSize?: string;
    thumbWidth?: number;
    width: number;
}

export type NavItem = {
    label: string;
    url: string;
};

export type ProductListItemType = {
    category: string;
    featured: boolean;
    image: string;
    name: string;
    price: string;
    slug: string;
    url: string;
}
