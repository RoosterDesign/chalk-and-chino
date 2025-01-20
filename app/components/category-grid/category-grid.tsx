import Carousel from '@/app/components/carousel/carousel';
import Container from '@/app/components/container/container';
import SectionHeader from '@/app/components/section-header/section-header';
import { CATEGORY_DETAILS } from "@/app/lib/constants";
import Image from 'next/image';
import Link from 'next/link';

import styles from './category-grid.module.scss';
const CategoryGrid: React.FC = () => {
    return (
        <section className={`${styles.categoryGrid} section-spacing`}>
            <Container>
                <SectionHeader title="Browse by Category" />
                <Carousel>

                    <Link className={styles.categoryCard} href={`/products/${CATEGORY_DETAILS.furniture.slug}`} title="">
                        <h3>Furniture</h3>
                        <span className="btn btn--alt">View products</span>
                        <Image alt="" height={350} src="https://picsum.photos/710/350" width={710} />
                    </Link>

                    <Link className={styles.categoryCard} href={`/products/${CATEGORY_DETAILS.fauxFloralsPots.slug}`} title="">
                        <h3>Faux Florals &amp; Upcycled Pots</h3>
                        <span className="btn btn--alt">View products</span>
                        <Image alt="" height={350} src="https://picsum.photos/710/350" width={710} />
                    </Link>

                    <Link className={styles.categoryCard} href={`/products/${CATEGORY_DETAILS.homeDecorAccessories.slug}`} title="">
                        <h3>Home Decor Accessories</h3>
                        <span className="btn btn--alt">View products</span>
                        <Image alt="" height={350} src="https://picsum.photos/710/350" width={710} />
                    </Link>

                    <Link className={styles.categoryCard} href="/products" title="">
                        <h3>All Products</h3>
                        <span className="btn btn--alt">View products</span>
                        <Image alt="" height={350} src="https://picsum.photos/710/350" width={710} />
                    </Link>

                </Carousel>

            </Container>
        </section>
    )
};

export default CategoryGrid
