"use client";
import type { GalleryBlock as GalleryBlockProps } from "@/payload-types";

import Carousel from "@/app/components/carousel/carousel";
import Container from "@/app/components/container/container";
import ImageExpander from "@/app/components/image-expander/image-expander";
import SectionHeader from "@/app/components/section-header/section-header";
import { mapSectionHeader } from "@/lib/mappers/mapSectionHeader";

import styles from "./styles.module.scss";

const GalleryBlock: React.FC<GalleryBlockProps> = ({
    sectionHeader,
    images,
}) => {
    if (images.length === 0) return null;
    return (
        <section className={`${styles.galleryCarousel} section-spacing`}>
            <Container>
                <SectionHeader {...mapSectionHeader(sectionHeader)} />
            </Container>

            {Array.isArray(images) && images.length > 0 && (
                <Carousel
                    arrows={true}
                    hasPadding
                    mobileOnly={false}
                    pagination={false}
                >
                    {images?.map((image) => {
                        if (typeof image === "object" && image.url) {
                            const thumb = image.sizes?.thumbnail;
                            const full = image.sizes?.modalPreview;
                            const thumbSrc = thumb?.url ?? image.url;
                            const fullSrc = full?.url ?? image.url;

                            return (
                                <ImageExpander
                                    alt={image.alt || ""}
                                    key={image.id}
                                    src={fullSrc}
                                    thumbHeight={thumb?.height ?? image.height ?? 615}
                                    thumbSrc={thumbSrc}
                                    thumbWidth={thumb?.width ?? image.width ?? 820}
                                />
                            );
                        }
                        return null;
                    })}
                </Carousel>
            )}
        </section>
    );
};

export default GalleryBlock;
