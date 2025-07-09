import Image from "next/image";
import Link from "next/link";

import type { HeroBlock as HeroBlockProps } from "@/payload-types";

import Container from "@/app/components/container/container";

import styles from "./styles.module.scss";

const HeroBlock: React.FC<HeroBlockProps> = ({
    image,
    title,
    intro,
    cta_button,
}) => {
    return (
        <section className={styles.hero}>
            <Container className={styles.container}>
                <h1>{title}</h1>
                <p>{intro}</p>

                {cta_button?.url && (
                    <Link
                        className={styles.button}
                        href={cta_button.url}
                        title={cta_button?.label || "Find out more"}
                    >
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
                        className="img-full"
                        height={image.sizes.landscape.height}
                        src={image.sizes.landscape.url}
                        width={image.sizes.landscape.width}
                    />
                )}
        </section>
    );
};

export default HeroBlock;
