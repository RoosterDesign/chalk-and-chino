'use client';
import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'

import Carousel from '@/app/components/carousel/carousel';
import Container from '@/app/components/container/container';
import ImageExpander from '@/app/components/image-expander/image-expander';
import SectionHeader from '@/app/components/section-header/section-header';

import styles from './styles.module.scss';

const GalleryBlock: React.FC<GalleryBlockProps> = ({ images }) => {

    return (
        <section className={`${styles.galleryCarousel} section-spacing`}>
            <Container>
                <SectionHeader centered linkLabel="View items for sale" linkUrl="/products" synopsis="Nunc aliquet fermentum sem vitae vulputate. Nullam nec libero tempus, porttitor tellus." title="My Work" />
            </Container>

            {Array.isArray(images) && images.length > 0 && (
                <Carousel arrows={true} hasPadding mobileOnly={false} pagination={false}>
                    {images?.map(image => {
                        if (typeof image === 'object' && image.url) {
                            const thumb = image.sizes?.galleryCarouselThumbnail;
                            const full = image.sizes?.modalPreview;

                            return (
                                <ImageExpander
                                    alt={image.alt || ''}
                                    height={full?.height!}
                                    key={image.id}
                                    src={full?.url ?? image.url}
                                    thumbHeight={thumb?.height!}
                                    thumbSrc={thumb?.url ?? image.url}
                                    thumbWidth={thumb?.width!}
                                    width={full?.width!}
                                />
                            )
                        }
                        return null
                    })}
                </Carousel>
            )}

        </section>
    )
}

export default GalleryBlock
