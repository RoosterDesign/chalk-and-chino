import Hero from '@/app/components/hero/hero';
import Container from '@/app/components/container/container';
import SellingPoints from '@/app/components/selling-points/selling-points';
import FeaturedProducts from '@/app/components/featured-products/featured-products';
import CategoryGrid from '@/app/components/category-grid/category-grid';
import SectionHeader from '@/app/components/section-header/section-header';
import Testimonials from '@/app/components/testimonials/testimonials';
import Banner from '@/app/components/banner/banner';
import GalleryTextBlock from '@/app/components/gallery-text-block/gallery-text-block';
export default function Home() {
    return (

        <>

            <Hero />
            <SellingPoints />
            <FeaturedProducts>
                <SectionHeader title="New Arrivals" linkLabel="View all products" linkUrl="#" />
            </FeaturedProducts>

            <CategoryGrid>
                <SectionHeader title="Browse by Category" />
            </CategoryGrid>

            <Testimonials>
                <SectionHeader title="Testimonials" intro="See what our happy customers have to say about our upcycled furniture and personalised service." centered />
            </Testimonials>

            <Banner />

            <GalleryTextBlock title="Pellentesque sagittis accumsan tellus." buttonLink="#" buttonLabel="Browse Products">
                <>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less.</p>
                    <p>A domain name is one of the first steps to establishing your brand. Secure a consistent brand image with a domain name that matches your business.</p>
                </>
            </GalleryTextBlock>

            {/* <Container>

                <br /><br /><br /><br />

                <h1>This is a heading 1</h1>
                <h2>This is a heading 2</h2>
                <h3>This is a heading 3</h3>
                <h4>This is a heading 4</h4>
                <h5>This is a heading 5</h5>
                <h6>This is a heading 6</h6>
                <p>Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing elit</a>. Donec vitae nunc eu risus suscipit varius quis nec ipsum. Donec vitae ante id arcu fermentum auctor. Mauris fermentum purus est, nec fringilla dolor pretium sed. Sed pretium pulvinar varius. Praesent in dignissim dolor. Nulla facilisi. Maecenas lobortis sapien id enim tempor varius. Nunc at augue leo. Nam dapibus aliquet tincidunt. Cras venenatis nisi nisi, eu efficitur dui consectetur volutpat. Nunc elit metus, rhoncus vitae posuere in, lacinia id dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                <p>Aliquam placerat tincidunt turpis, et congue nibh tincidunt eget. Fusce scelerisque turpis id tristique molestie. Nullam elementum, lacus eget feugiat commodo, lorem massa laoreet lorem, quis imperdiet nulla nisi semper leo. Cras posuere lorem vitae massa viverra rhoncus. In quis sodales urna. Donec libero leo, interdum et interdum at, commodo nec eros. Ut molestie dictum arcu at placerat. Vivamus quis eros orci. Pellentesque ullamcorper eleifend nisl nec dapibus.</p>
                <p>Aliquam placerat tincidunt turpis, et congue nibh tincidunt eget. Fusce scelerisque turpis id tristique molestie. Nullam elementum, lacus eget feugiat commodo, lorem massa laoreet lorem, quis imperdiet nulla nisi semper leo. Cras posuere lorem vitae massa viverra rhoncus. In quis sodales urna. Donec libero leo, interdum et interdum at, commodo nec eros. Ut molestie dictum arcu at placerat. Vivamus quis eros orci. Pellentesque ullamcorper eleifend nisl nec dapibus.</p>
                <p>Aliquam placerat tincidunt turpis, et congue nibh tincidunt eget. Fusce scelerisque turpis id tristique molestie. Nullam elementum, lacus eget feugiat commodo, lorem massa laoreet lorem, quis imperdiet nulla nisi semper leo. Cras posuere lorem vitae massa viverra rhoncus. In quis sodales urna. Donec libero leo, interdum et interdum at, commodo nec eros. Ut molestie dictum arcu at placerat. Vivamus quis eros orci. Pellentesque ullamcorper eleifend nisl nec dapibus.</p>
                <p>Aliquam placerat tincidunt turpis, et congue nibh tincidunt eget. Fusce scelerisque turpis id tristique molestie. Nullam elementum, lacus eget feugiat commodo, lorem massa laoreet lorem, quis imperdiet nulla nisi semper leo. Cras posuere lorem vitae massa viverra rhoncus. In quis sodales urna. Donec libero leo, interdum et interdum at, commodo nec eros. Ut molestie dictum arcu at placerat. Vivamus quis eros orci. Pellentesque ullamcorper eleifend nisl nec dapibus.</p>
                <ul>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                </ul>
                <ol>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                </ol>

                <a href="#" className="btn">Click me</a>

            </Container> */}

        </>
    );
}
