type ImageData = {
    alt?: string;
    url: string;
};

type PayloadImage =
    | {
        alt?: null | string;
        url?: null | string;
    }
    | null
    | number
    | undefined;

/**
 * Returns a valid image object with `url` and optional `alt`,
 * or `undefined` if input is null, number, or missing url.
 */
export function getImageData(
    image: PayloadImage,
    fallbackAlt?: string
): ImageData | undefined {
    if (
        typeof image === 'object' &&
        image !== null &&
        'url' in image &&
        typeof image.url === 'string'
    ) {
        return {
            url: image.url,
            alt: image.alt ?? fallbackAlt,
        };
    }

    return undefined;
}
