import type { HeroBlock as HeroBlockProps } from '@/payload-types'

import Container from '@/app/components/container/container'
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss'

const HeroBlock: React.FC<HeroBlockProps> = ({ image, title, intro, cta_button }) => {

    return (
        <section className={styles.hero}>

            <Container className={styles.container}>
                <h1>{title}</h1>
                <p>{intro}</p>

                {cta_button?.url && (
                    <Link className={styles.button} href={cta_button.url}>
                        {cta_button.label}
                    </Link>
                )}

            </Container>

            {typeof image === 'object' &&
                image?.sizes?.hero?.url &&
                typeof image.sizes.hero.width === 'number' &&
                typeof image.sizes.hero.height === 'number' &&
                <Image
                    alt={image.alt || ''}
                    className="img-full"
                    height={image.sizes.hero.height}
                    src={image.sizes.hero.url}
                    width={image.sizes.hero.width}
                />
            }

        </section>
    );
}

export default HeroBlock
