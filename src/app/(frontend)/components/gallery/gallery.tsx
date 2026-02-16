"use client";
import type { Media } from "@/payload-types";

import Container from "@/app/components/container/container";
import ImageExpander from "@/app/components/image-expander/image-expander";

import styles from "./gallery.module.scss";

type GalleryImage = {
    id?: null | string;
    image: Media | number;
    thumbnailSize: "full" | "half";
};

type GalleryProps = {
    images: GalleryImage[];
};

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    if (images.length === 0) return null;
    return (
        <section className="section-spacing">
            <Container>
                <div className={styles.galleryGrid}>
                    {images.map((image) => {
                        if (
                            typeof image.image === "object" &&
                            image.image?.url
                        ) {
                            const thumb = image.image.sizes?.thumbnail;
                            const thumbFullWidth = image.image.sizes?.landscape;

                            let thumbSrc: string | undefined;
                            let thumbHeight: number;
                            let thumbWidth: number;

                            if (image.thumbnailSize === "half") {
                                thumbSrc = thumb?.url ?? undefined;
                                thumbHeight = thumb?.height ?? image.image.height ?? 615;
                                thumbWidth = thumb?.width ?? image.image.width ?? 820;
                            } else {
                                thumbSrc = thumbFullWidth?.url ?? undefined;
                                thumbHeight = thumbFullWidth?.height ?? image.image.height ?? 900;
                                thumbWidth = thumbFullWidth?.width ?? image.image.width ?? 1920;
                            }

                            const resolvedThumbSrc = thumbSrc ?? image.image.url;
                            const fullSrc = image.image.url ?? thumbSrc;

                            if (!resolvedThumbSrc || !fullSrc) return null;

                            return (
                                <ImageExpander
                                    alt={image.image.alt || ""}
                                    className={
                                        image.thumbnailSize === "full"
                                            ? "gallery-item-fw"
                                            : undefined
                                    }
                                    key={image.id}
                                    src={fullSrc}
                                    thumbHeight={thumbHeight}
                                    thumbSrc={resolvedThumbSrc}
                                    thumbWidth={thumbWidth}
                                />
                            );
                        }
                    })}
                </div>
            </Container>
        </section>
    );
};

export default Gallery;
