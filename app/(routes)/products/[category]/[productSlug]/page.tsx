import productsData from "@/app/data/products.json";

type Params = {
    category: string;
    productSlug: string;
}

type ProductDetailsPageProps = {
    params: Promise<Params>;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ params }) => {
    const { productSlug, category } = await params;

    // Find the product based on its slug and category
    const product = productsData.find((p) => p.slug === productSlug && p.category === category);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} style={{ maxWidth: "300px" }} />
            <p>Price: ${product.price}</p>
        </div>
    );
}

export default ProductDetailsPage;
