import styles from './gallery-carousel.module.scss';

type GalleryCarouselProps = {
    children: React.ReactNode;
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ children }) => {
    return (
        <section className={`${styles.galleryCarousel} section-spacing`}>
            {children}
        </section>
    )
}

export default GalleryCarousel;
