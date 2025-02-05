import Banner from '@/app/components/banner/banner';
import CategoryGrid from '@/app/components/category-grid/category-grid';
import FeaturedProducts from '@/app/components/featured-products/featured-products';
import GalleryTextBlock from '@/app/components/gallery-text-block/gallery-text-block';
import Hero from '@/app/components/hero/hero';
import SellingPoints from '@/app/components/selling-points/selling-points';
import Testimonials from '@/app/components/testimonials/testimonials';
export default function Home() {
    return (

        <>
            <Hero />
            <SellingPoints />
            <FeaturedProducts />
            <CategoryGrid />
            <Testimonials />
            <Banner />
            <GalleryTextBlock buttonLabel="Browse Products" buttonLink="#" title="Pellentesque sagittis accumsan tellus.">
                <>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less.</p>
                    <p>A domain name is one of the first steps to establishing your brand. Secure a consistent brand image with a domain name that matches your business.</p>
                </>
            </GalleryTextBlock>
        </>
    );
}
