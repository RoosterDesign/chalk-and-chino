'use client';
import Carousel from '@/app/components/carousel/carousel';
import Container from '@/app/components/container/container';
import ImageExpander from '@/app/components/image-expander/image-expander';
import SectionHeader from '@/app/components/section-header/section-header';
import { ImageExpanderType } from '@/lib/types';

import styles from './gallery-carousel.module.scss';

type GalleryCarouselProps = {
    images: ImageExpanderType[];
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images }) => {

    return (
        <section className={`${styles.galleryCarousel} section-spacing`}>
            <Container>
                <SectionHeader centered linkLabel="View items for sale" linkUrl="/products" synopsis="Nunc aliquet fermentum sem vitae vulputate. Nullam nec libero tempus, porttitor tellus." title="My Work" />
            </Container>

            <Carousel arrows={true} hasPadding mobileOnly={false} pagination={false}>
                {images.map((image, index) => (
                    <ImageExpander alt={image.alt}
                        height={image.height}
                        key={index}
                        src={image.src}
                        thumbHeight={image.thumbHeight}
                        thumbWidth={image.thumbWidth}
                        width={image.width}
                    />
                ))}

            </Carousel>

        </section>
    )
}

export default GalleryCarousel;
