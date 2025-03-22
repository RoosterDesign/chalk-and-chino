'use client';
import Carousel from '@/components/carousel/carousel';
import Container from '@/components/container/container';
import ImageExpander from '@/components/image-expander/image-expander';
import SectionHeader from '@/components/section-header/section-header';
import { ImageExpanderType } from '@/app/lib/types';

import styles from './gallery-carousel.module.scss';

type GalleryCarouselProps = {
    images: ImageExpanderType[];
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images }) => {

    return (
        <section className={`${styles.galleryCarousel} section-spacing`}>
            <Container>
                <SectionHeader centered intro="Nunc aliquet fermentum sem vitae vulputate. Nullam nec libero tempus, porttitor tellus." linkLabel="View items for sale" linkUrl="/products" title="My Work" />
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
