import type { HeroBlock as HeroBlockProps } from '@/payload-types'

import Container from '@/components/container/container';
import Link from 'next/link';

import styles from './Styles.module.scss';

export const HeroBlock: React.FC<HeroBlockProps> = ({ image, title, intro, cta_button }) => {

    const imageUrl =
        typeof image === 'object' && image !== null && 'url' in image
            ? image.url
            : undefined;

    return (
        <section className={styles.hero}>

            <Container className={styles.container}>
                <h1>{title}</h1>
                <p>{intro}</p>

                {/* <p><a className="" href={cta_button.url} title="">{cta_button.label}</a></p> */}

                {cta_button?.url && (
                    <Link className={styles.button} href={cta_button.url}>
                        {cta_button.label}
                    </Link>
                )}

            </Container>

            <picture>
                {/* <img alt="" className="img-full" src={imageUrl} /> */}
            </picture>

        </section>
    );
};
