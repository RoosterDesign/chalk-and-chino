import Image from "next/image";
import Link from "next/link";

import type { BannerBlock as BannerBlockProps } from "@/payload-types";

import Container from "@/app/components/container/container";

import styles from "./styles.module.scss";

const BannerBlock: React.FC<BannerBlockProps> = ({
    image,
    title,
    body,
    cta_button,
}) => {
    return (
        <section className={`${styles.banner} section-spacing`}>
            <Container>
                {title && <h2>{title}</h2>}
                {body && <p>{body}</p>}
                {cta_button?.url && (
                    <Link className="btn" href={cta_button.url}>
                        {cta_button.label}
                    </Link>
                )}
            </Container>
            {typeof image === "object" &&
                image?.sizes?.landscape?.url &&
                typeof image.sizes.landscape.width === "number" &&
                typeof image.sizes.landscape.height === "number" && (
                    <Image
                        alt={image.alt || ""}
                        height={image.sizes.landscape.height}
                        src={image.sizes.landscape.url}
                        width={image.sizes.landscape.width}
                    />
                )}
        </section>
    );
};

export default BannerBlock;
