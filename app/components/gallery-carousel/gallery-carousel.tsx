'use client';
import { ImageExpanderType } from '@/app/lib/types';
import Carousel from '@/app/components/carousel/carousel';
import Container from '@/app/components/container/container';
import ImageExpander from '@/app/components/image-expander/image-expander';
import styles from './gallery-carousel.module.scss';

type GalleryCarouselProps = {
    images: ImageExpanderType[];
    children: React.ReactNode;
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images, children }) => {

    return (
        <section className={`${styles.galleryCarousel} section-spacing`}>
            <Container>
                {children}
            </Container>

            <Carousel mobileOnly={false} arrows={true} pagination={false} hasPadding>
                {images.map((image, index) => (
                    <div key={index} className="cursor-pointer">
                        <ImageExpander src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            thumbWidth={image.thumbWidth}
                            thumbHeight={image.thumbHeight}
                        />
                    </div>
                ))}

            </Carousel>

        </section>
    )
}

export default GalleryCarousel;
