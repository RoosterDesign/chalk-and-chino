import Gallery from '@/app/components/gallery/gallery';
import Map from '@/app/components/map/map';
import ProductDetails from '@/app/components/product-details/product-details';
import Testimonials from '@/app/components/testimonials/testimonials';
import productsData from "@/app/data/products.json";

type Params = {
    category: string;
    productSlug: string;
}

type ProductDetailsPageProps = {
    params: Promise<Params>;
}

const images = [
    { alt: 'Image 1', height: 1400, src: 'https://picsum.photos/1400/1400', thumbSize: "small", width: 1400 },
    { alt: 'Image 2', height: 1400, src: 'https://picsum.photos/1400/1400', thumbSize: "small", width: 1400 },
    { alt: 'Image 3', height: 1400, src: 'https://picsum.photos/1400/1400', thumbSize: "full", width: 1400 },
    { alt: 'Image 4', height: 1400, src: 'https://picsum.photos/1400/1400', thumbSize: "small", width: 1400 },
    { alt: 'Image 5', height: 1400, src: 'https://picsum.photos/1400/1400', thumbSize: "small", width: 1400 }
];

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ params }) => {
    const { category, productSlug } = await params;

    // Find the product based on its slug and category
    const product = productsData.find((p) => p.slug === productSlug && p.category === category);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <ProductDetails product={product} />
            <Gallery images={images} />
            <Testimonials />
            <Map />

        </>
        // <div>
        //     <h1>{product.name}</h1>
        //     <img src={product.image} alt={product.name} style={{ maxWidth: "300px" }} />
        //     <p>Price: ${product.price}</p>
        // </div>
    );
}

export default ProductDetailsPage;
