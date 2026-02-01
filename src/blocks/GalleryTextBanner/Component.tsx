import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import Link from "next/link";

import type { GalleryTextBannerBlock as GalleryTextBannerBlockProps } from "@/payload-types";

import Container from "@/app/components/container/container";

import styles from "./styles.module.scss";

const GalleryTextBannerBlock: React.FC<GalleryTextBannerBlockProps> = ({
    atTop,
    reverse,
    image1,
    image2,
    image3,
    title,
    body,
    cta_button,
}) => {
    return (
        <section
            className={`${styles.GalleryTextBlock} ${atTop ? styles.atTop : ""}`}
        >
            <Container className={styles.container}>
                <div className={styles.content}>
                    <h2>{title}</h2>
                    {body && <RichText data={body} />}
                    {cta_button?.url && (
                        <Link className="btn" href={cta_button.url}>
                            {cta_button.label}
                        </Link>
                    )}
                </div>

                <div className={styles.gallery}>
                    {typeof image1 === "object" &&
                        image1?.sizes?.portrait?.url &&
                        typeof image1.sizes.portrait.width === "number" &&
                        typeof image1.sizes.portrait.height === "number" && (
                            <Image
                                alt={image1.alt || ""}
                                height={image1.sizes.portrait.height}
                                src={image1.sizes.portrait.url}
                                unoptimized
                                width={image1.sizes.portrait.width}
                            />
                        )}

                    {typeof image2 === "object" &&
                        image2?.sizes?.portrait?.url &&
                        typeof image2.sizes.portrait.width === "number" &&
                        typeof image2.sizes.portrait.height === "number" && (
                            <Image
                                alt={image2.alt || ""}
                                height={image2.sizes.portrait.height}
                                src={image2.sizes.portrait.url}
                                unoptimized
                                width={image2.sizes.portrait.width}
                            />
                        )}

                    {typeof image3 === "object" &&
                        image3?.sizes?.portrait?.url &&
                        typeof image3.sizes.portrait.width === "number" &&
                        typeof image3.sizes.portrait.height === "number" && (
                            <Image
                                alt={image3.alt || ""}
                                height={image3.sizes.portrait.height}
                                src={image3.sizes.portrait.url}
                                unoptimized
                                width={image3.sizes.portrait.width}
                            />
                        )}
                </div>
            </Container>
        </section>
    );
};

export default GalleryTextBannerBlock;
