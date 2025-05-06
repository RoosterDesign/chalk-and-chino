'use client';

import Carousel from '@/components/carousel/carousel';
import Container from '@/components/container/container';
import SectionHeader from '@/components/section-header/section-header';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss'

type Props = {
    categories: {
        image?: {
            alt?: string;
            url: string;
        }
        label: string;
        url: string;
    }[];
    title?: string;
}

const CategoryGridBlock: React.FC<Props> = ({ categories, title }) => {

    return (
        <section className={`${styles.categoryGrid} section-spacing`}>
            <Container>
                <SectionHeader title={title} />
                <Carousel>
                    {categories.map((category) => (
                        <Link
                            className={styles.categoryCard}
                            href={category.url}
                            key={category.url}
                            title={category.label}
                        >
                            <h3>{category.label}</h3>
                            <span className="btn btn--alt">View products</span>
                            {category.image?.url && (
                                <Image
                                    alt={category.image.alt || category.label}
                                    height={350}
                                    src={category.image.url}
                                    width={710}
                                />
                            )}
                        </Link>
                    ))}
                </Carousel>
            </Container>
        </section >
    )
};

export default CategoryGridBlock
