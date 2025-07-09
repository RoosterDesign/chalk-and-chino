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

                            let thumbSrc;
                            let thumbHeight;
                            let thumbWidth;

                            if (image.thumbnailSize === "half") {
                                thumbSrc = thumb?.url;
                                thumbHeight = thumb?.height;
                                thumbWidth = thumb?.width;
                            } else {
                                thumbSrc = thumbFullWidth?.url;
                                thumbHeight = thumbFullWidth?.height;
                                thumbWidth = thumbFullWidth?.width;
                            }

                            return (
                                <ImageExpander
                                    alt={image.image.alt || ""}
                                    className={
                                        image.thumbnailSize === "full"
                                            ? "gallery-item-fw"
                                            : undefined
                                    }
                                    key={image.id}
                                    src={image.image.url ?? thumbSrc}
                                    thumbHeight={thumbHeight!}
                                    thumbSrc={thumbSrc ?? image.image.url}
                                    thumbWidth={thumbWidth!}
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
