'use client';
import type { Media } from '@/payload-types'

import Container from '@/app/components/container/container';
import ImageExpander from '@/app/components/image-expander/image-expander';

import styles from './gallery.module.scss';

type GalleryImage = {
    id?: null | string
    image: Media | number;
    thumbnailSize: 'full' | 'half'
};

type GalleryProps = {
    images: GalleryImage[];
};

const Gallery: React.FC<GalleryProps> = ({ images }) => {

    return (
        <section className="section-spacing">
            <Container>
                <div className={styles.galleryGrid}>
                    {images.map(item => {
                        if (typeof item.image === 'object' && item.image?.url) {

                            const thumbDimensions = item.thumbnailSize === 'half' ? { height: 640, width: 850 } : { height: 640, width: 1720 };

                            return (
                                <ImageExpander
                                    alt={item.image.alt || ''}
                                    className={item.thumbnailSize === 'full' ? 'gallery-item-fw' : undefined}
                                    height={item.image.height!}
                                    key={item.id}
                                    src={item.image.url}
                                    thumbHeight={thumbDimensions.height}
                                    thumbWidth={thumbDimensions.width}
                                    width={item.image.width!}
                                />
                            );
                        }
                    })}
                </div>
            </Container>
        </section>
    )
}

export default Gallery;
