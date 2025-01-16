export type NavItem = {
    url: string;
    label: string;
    title: string;
};

export type ImageExpanderType = {
    src: string;
    alt: string;
    width: number;
    height: number;
    thumbWidth: number;
    thumbHeight: number;
}

export type ProductListItemType = {
    slug: string;
    image: string;
    price: string;
    name: string;
    category: string;
    url: string;
    featured: boolean;
}
