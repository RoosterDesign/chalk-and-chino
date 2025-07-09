"use client";

import Image from "next/image";

import type { MastheadBlock as MastheadBlockProps } from "@/payload-types";

import Container from "@/app/components/container/container";

import styles from "./styles.module.scss";

const MastheadBlock: React.FC<MastheadBlockProps> = ({ title, image }) => {
    // Determine the URL and dimensions, with fallbacks,
    // making sure we never assign null.
    let srcUrl: string | undefined;
    let width: number | undefined;
    let height: number | undefined;
    let altText = "";

    if (image && typeof image === "object") {
        altText = image.alt ?? "";

        const mastheadSize = image.sizes?.masthead;
        if (
            mastheadSize &&
            typeof mastheadSize.url === "string" &&
            typeof mastheadSize.width === "number" &&
            typeof mastheadSize.height === "number"
        ) {
            srcUrl = mastheadSize.url;
            width = mastheadSize.width;
            height = mastheadSize.height;
        } else if (typeof image.url === "string") {
            // fallback to original upload
            srcUrl = image.url;
            width = typeof image.width === "number" ? image.width : undefined;
            height =
                typeof image.height === "number" ? image.height : undefined;
        }
    }

    return (
        <section
            className={`${styles.masthead} ${
                srcUrl ? styles.mastheadWithImg : ""
            }`}
        >
            <Container className={styles.container}>
                <h1>{title}</h1>
            </Container>

            {srcUrl && width && height && (
                <Image
                    alt={altText}
                    className="img-full"
                    height={height}
                    priority
                    src={srcUrl}
                    width={width}
                />
            )}
        </section>
    );
};

export default MastheadBlock;
