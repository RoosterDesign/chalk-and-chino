import productsData from "@/app/data/products.json";

interface Params {
    category: string;
    productSlug: string;
}

interface ProductDetailsPageProps {
    params: Params;
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
    const { productSlug, category } = params;

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
