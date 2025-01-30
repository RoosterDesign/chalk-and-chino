'use client';
import Container from '@/app/components/container/container';
import ImageExpander from '@/app/components/image-expander/image-expander';
import SectionHeader from '@/app/components/section-header/section-header';
import { ImageExpanderType } from '@/app/lib/types';

import styles from './gallery.module.scss';

type GalleryProps = {
    images: ImageExpanderType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {

    return (
        <section className="section-spacing">
            <Container>
                {/* <SectionHeader centered intro="Nunc aliquet fermentum sem vitae vulputate. Nullam nec libero tempus, porttitor tellus." linkLabel="View items for sale" linkUrl="/products" title="My Work" /> */}

                <div className={styles.galleryGrid}>
                    {images.map((image, index) => {
                        const thumbDimensions = image.thumbSize === 'small' ? { height: 640, width: 850 } : { height: 640, width: 1720 };
                        return (
                            <ImageExpander alt={image.alt}
                                className={image.thumbSize === 'full' ? "gallery-item-fw" : null}
                                height={image.height}
                                key={index}
                                src={image.src}
                                thumbHeight={thumbDimensions.height}
                                thumbWidth={thumbDimensions.width}
                                width={image.width}
                            />
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}

export default Gallery;
