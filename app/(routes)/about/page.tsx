import FeaturedProducts from '@/app/components/featured-products/featured-products';
import GalleryCarousel from '@/app/components/gallery-carousel/gallery-carousel';
import GalleryTextBlock from '@/app/components/gallery-text-block/gallery-text-block';
import Map from '@/app/components/map/map';
import Masthead from '@/app/components/masthead/masthead';
import Testimonials from '@/app/components/testimonials/testimonials';

const images = [
    { alt: 'Image 1', height: 1400, src: 'https://picsum.photos/1400/1400', thumbHeight: 520, thumbWidth: 520, width: 1400 },
    { alt: 'Image 2', height: 1400, src: 'https://picsum.photos/1400/1400', thumbHeight: 520, thumbWidth: 520, width: 1400 },
    { alt: 'Image 3', height: 1400, src: 'https://picsum.photos/1400/1400', thumbHeight: 520, thumbWidth: 520, width: 1400 },
    { alt: 'Image 4', height: 1400, src: 'https://picsum.photos/1400/1400', thumbHeight: 520, thumbWidth: 520, width: 1400 },
    { alt: 'Image 5', height: 1400, src: 'https://picsum.photos/1400/1400', thumbHeight: 520, thumbWidth: 520, width: 1400 },
    { alt: 'Image 6', height: 1400, src: 'https://picsum.photos/1400/1400', thumbHeight: 520, thumbWidth: 520, width: 1400 },
    { alt: 'Image 7', height: 1400, src: 'https://picsum.photos/1400/1400', thumbHeight: 520, thumbWidth: 520, width: 1400 },
    { alt: 'Image 8', height: 1400, src: 'https://picsum.photos/1400/1400', thumbHeight: 520, thumbWidth: 520, width: 1400 },
];

const About: React.FC = () => {

    return (
        <>
            <Masthead title="About" />
            <GalleryTextBlock atTop buttonLabel="Browse Products" buttonLink="#" title="Pellentesque sagittis accumsan tellus.">
                <>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less.</p>
                    <p>A domain name is one of the first steps to establishing your brand. Secure a consistent brand image with a domain name that matches your business.</p>
                </>
            </GalleryTextBlock>
            <GalleryCarousel images={images} />
            <Testimonials />
            <Map />
            <FeaturedProducts />
        </>
    )
}

export default About;
