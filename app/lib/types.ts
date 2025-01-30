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

export type ProductSpecification = {
    key: string;
    value: string;
}

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
}
