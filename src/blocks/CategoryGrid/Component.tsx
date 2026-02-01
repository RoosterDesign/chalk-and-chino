"use client";

import Image from "next/image";
import Link from "next/link";

import type { Media } from "@/payload-types";

import Carousel from "@/components/carousel/carousel";
import Container from "@/components/container/container";
import SectionHeader from "@/components/section-header/section-header";

import styles from "./styles.module.scss";

type Props = {
    categories: {
        image?: Media;
        label: string;
        url: string;
    }[];
    title?: string;
};

const CategoryGridBlock: React.FC<Props> = ({ categories, title }) => {
    return (
        <section className={`${styles.categoryGrid} section-spacing`}>
            <Container>
                <SectionHeader title={title} />
                <Carousel autoPlay>
                    {categories.map((category) => (
                        <Link
                            className={styles.categoryCard}
                            href={category.url}
                            key={category.url}
                            title={category.label}
                        >
                            <h3>{category.label}</h3>
                            <span className="btn btn--alt">View products</span>

                            {typeof category.image === "object" &&
                                category.image?.sizes?.categoryBanner?.url && (
                                    <Image
                                        alt={
                                            category.image?.alt ||
                                            category.label
                                        }
                                        height={
                                            category.image?.sizes
                                                ?.categoryBanner?.height ?? 350
                                        }
                                        src={
                                            category.image?.sizes
                                                ?.categoryBanner?.url ??
                                            category.image?.url
                                        }
                                        unoptimized
                                        width={
                                            category.image?.sizes
                                                ?.categoryBanner?.width ?? 710
                                        }
                                    />
                                )}
                        </Link>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
};

export default CategoryGridBlock;
