import { CATEGORY_SLUGS } from "@/app/lib/constants";
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/app/components/container/container';
import Carousel from '@/app/components/carousel/carousel';

import styles from './category-grid.module.scss';

type CategoryGridProps = {
    children: React.ReactNode;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ children }) => {
    return (
        <section className={`${styles.categoryGrid} section-spacing`}>
            <Container>
                {children}
                <Carousel>

                    <Link href={`/products/${CATEGORY_SLUGS.FURNITURE}`} title="" className={styles.categoryCard}>
                        <h3>Furniture</h3>
                        <span className="btn btn--alt">View products</span>
                        <Image src="https://picsum.photos/710/350" alt="" height={350} width={710} />
                    </Link>

                    <Link href={`/products/${CATEGORY_SLUGS.FAUX_FLORALS_POTS}`} title="" className={styles.categoryCard}>
                        <h3>Faux Florals &amp; Upcycled Pots</h3>
                        <span className="btn btn--alt">View products</span>
                        <Image src="https://picsum.photos/710/350" alt="" height={350} width={710} />
                    </Link>

                    <Link href={`/products/${CATEGORY_SLUGS.HOME_DECOR_ACCESSORIES}`} title="" className={styles.categoryCard}>
                        <h3>Home Decor Accessories</h3>
                        <span className="btn btn--alt">View products</span>
                        <Image src="https://picsum.photos/710/350" alt="" height={350} width={710} />
                    </Link>

                    <Link href="/products" title="" className={styles.categoryCard}>
                        <h3>All Products</h3>
                        <span className="btn btn--alt">View products</span>
                        <Image src="https://picsum.photos/710/350" alt="" height={350} width={710} />
                    </Link>

                </Carousel>

            </Container>
        </section>
    )
};

export default CategoryGrid
