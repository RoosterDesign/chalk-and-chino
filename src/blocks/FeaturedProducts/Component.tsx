import type { FeaturedProductsBlock as FeaturedProductsBlockProps } from "@/payload-types";

import Carousel from "@/app/components/carousel/carousel";
import Container from "@/app/components/container/container";
import ProductCard from "@/app/components/product-card/product-card";
import SectionHeader from "@/app/components/section-header/section-header";
import { mapSectionHeader } from "@/lib/mappers/mapSectionHeader";
import { isPublishedProduct } from "@/lib/utils/typeGuards";

import styles from "./styles.module.scss";

const FeaturedProductsBlock: React.FC<FeaturedProductsBlockProps> = ({
    sectionHeader,
    products,
}) => {
    const validProducts = products?.filter(isPublishedProduct) || [];

    return (
        <section className={styles.featuredProducts}>
            <Container>
                <SectionHeader {...mapSectionHeader(sectionHeader)} />
                {validProducts.length > 0 && (
                    <Carousel>
                        {validProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </Carousel>
                )}
            </Container>
        </section>
    );
};

export default FeaturedProductsBlock;
