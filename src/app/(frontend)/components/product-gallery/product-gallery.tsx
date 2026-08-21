"use client";
import Image from "next/image";
import { useState } from "react";

import type { Media, Product } from "@/payload-types";

import ImageExpander from "@/components/image-expander/image-expander";

import styles from "./product-gallery.module.scss";

type ProductGalleryProps = {
    galleryImages?: Product["gallery"];
    heroImage: Media;
};

// Every size falls back to the master file, so an upload that was too small
// for a given derivative still renders.
const resolveSizes = (image: Media) => {
    const display = image.sizes?.thumbnail;
    const full = image.sizes?.modalPreview;
    const rail = image.sizes?.portrait;

    return {
        displayHeight: display?.height ?? image.height ?? 0,
        displaySrc: display?.url ?? image.url ?? "",
        displayWidth: display?.width ?? image.width ?? 0,
        fullHeight: full?.height ?? image.height ?? 0,
        fullSrc: full?.url ?? image.url ?? "",
        fullWidth: full?.width ?? image.width ?? 0,
        railHeight: rail?.height ?? display?.height ?? image.height ?? 0,
        railSrc: rail?.url ?? display?.url ?? image.url ?? "",
        railWidth: rail?.width ?? display?.width ?? image.width ?? 0,
    };
};

const ProductGallery: React.FC<ProductGalleryProps> = ({
    galleryImages,
    heroImage,
}) => {
    // The hero always leads, so selecting a gallery thumbnail can be undone.
    const images: Media[] = [
        heroImage,
        ...(galleryImages ?? [])
            .map((item) => item.image)
            .filter(
                (image): image is Media =>
                    typeof image === "object" && image !== null
            ),
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const activeImage = images[activeIndex] ?? heroImage;
    const active = resolveSizes(activeImage);

    return (
        <div className={styles.gallery}>
            <div className={styles.main}>
                <ImageExpander
                    alt={activeImage.alt ?? ""}
                    height={active.fullHeight}
                    src={active.fullSrc}
                    thumbHeight={active.displayHeight}
                    thumbSrc={active.displaySrc}
                    thumbWidth={active.displayWidth}
                    width={active.fullWidth}
                />
            </div>

            {images.length > 1 && (
                <div className={styles.rail}>
                    {images.map((image, index) => {
                        const { railHeight, railSrc, railWidth } =
                            resolveSizes(image);
                        const isActive = index === activeIndex;

                        if (!railSrc) return null;

                        return (
                            <button
                                aria-current={isActive}
                                aria-label={`Show image ${index + 1} of ${images.length}`}
                                className={`${styles.thumb} ${
                                    isActive ? styles.thumbActive : ""
                                }`}
                                key={image.id ?? index}
                                onClick={() => setActiveIndex(index)}
                                type="button"
                            >
                                <Image
                                    alt={image.alt ?? ""}
                                    height={railHeight}
                                    loading="lazy"
                                    src={railSrc}
                                    unoptimized
                                    width={railWidth}
                                />
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ProductGallery;
