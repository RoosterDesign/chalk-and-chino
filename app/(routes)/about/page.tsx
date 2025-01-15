import Masthead from '@/app/components/masthead/masthead';
import GalleryTextBlock from '@/app/components/gallery-text-block/gallery-text-block';
import FeaturedProducts from '@/app/components/featured-products/featured-products';
import SectionHeader from '@/app/components/section-header/section-header';
import Testimonials from '@/app/components/testimonials/testimonials';
import GalleryCarousel from '@/app/components/gallery-carousel/gallery-carousel';

const images = [
    { src: 'https://picsum.photos/1400/1400', alt: 'Image 1', thumbWidth: 520, thumbHeight: 520, width: 1400, height: 1400 },
    { src: 'https://picsum.photos/1400/1400', alt: 'Image 2', thumbWidth: 520, thumbHeight: 520, width: 1400, height: 1400 },
    { src: 'https://picsum.photos/1400/1400', alt: 'Image 3', thumbWidth: 520, thumbHeight: 520, width: 1400, height: 1400 },
    { src: 'https://picsum.photos/1400/1400', alt: 'Image 4', thumbWidth: 520, thumbHeight: 520, width: 1400, height: 1400 },
    { src: 'https://picsum.photos/1400/1400', alt: 'Image 5', thumbWidth: 520, thumbHeight: 520, width: 1400, height: 1400 },
    { src: 'https://picsum.photos/1400/1400', alt: 'Image 6', thumbWidth: 520, thumbHeight: 520, width: 1400, height: 1400 },
    { src: 'https://picsum.photos/1400/1400', alt: 'Image 7', thumbWidth: 520, thumbHeight: 520, width: 1400, height: 1400 },
    { src: 'https://picsum.photos/1400/1400', alt: 'Image 8', thumbWidth: 520, thumbHeight: 520, width: 1400, height: 1400 },
];

const About: React.FC = () => {

    return (
        <>
            <Masthead title="About" />

            <GalleryTextBlock title="Pellentesque sagittis accumsan tellus." buttonLink="#" buttonLabel="Browse Products" atTop>
                <>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less.</p>
                    <p>A domain name is one of the first steps to establishing your brand. Secure a consistent brand image with a domain name that matches your business.</p>
                </>
            </GalleryTextBlock>

            <GalleryCarousel images={images}>
                <SectionHeader title="My Work" intro="Nunc aliquet fermentum sem vitae vulputate. Nullam nec libero tempus, porttitor tellus." linkUrl="#" linkLabel="View items for sale" centered />
            </GalleryCarousel>

            <Testimonials>
                <SectionHeader title="Testimonials" intro="See what our happy customers have to say about our upcycled furniture and personalised service." centered />
            </Testimonials>


            <FeaturedProducts>
                <SectionHeader title="New Arrivals" linkLabel="View all products" linkUrl="#" />
            </FeaturedProducts>
        </>
    )
}

export default About;
