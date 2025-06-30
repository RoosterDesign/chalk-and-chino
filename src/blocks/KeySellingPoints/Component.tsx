import type { KeySellingPointsBlock as KeySellingPointsBlockProps } from "@/payload-types";

import Carousel from "@/app/components/carousel/carousel";
import Container from "@/app/components/container/container";

import styles from "./styles.module.scss";

const KeySellingPointsBlock: React.FC<KeySellingPointsBlockProps> = ({
    points,
}) => {
    return (
        <section className={styles.sellingPoints}>
            <Container>
                <Carousel arrows autoPlay mobileGap="" tabletGap="">
                    {points.map((point) => {
                        return (
                            <dl key={point.id}>
                                <dt>{point.title}</dt>
                                <dd>{point.body}</dd>
                            </dl>
                        );
                    })}
                </Carousel>
            </Container>
        </section>
    );
};

export default KeySellingPointsBlock;
