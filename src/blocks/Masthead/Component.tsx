import type { MastheadBlock as MastheadBlockProps } from '@/payload-types'

import Container from '@/app/components/container/container';
import Image from 'next/image';

import styles from './styles.module.scss';

const MastheadBlock: React.FC<MastheadBlockProps> = ({ title, image }) => {
    return (
        <section className={`${styles.masthead}`}>
            <Container className={styles.container}>
                <h1>{title}</h1>
            </Container>

            {typeof image === 'object' &&
                image?.sizes?.masthead?.url &&
                typeof image.sizes.masthead.width === 'number' &&
                typeof image.sizes.masthead.height === 'number' &&
                <Image
                    alt={image.alt || ''}
                    className="img-full"
                    height={image.sizes.masthead.height}
                    src={image.sizes.masthead.url}
                    width={image.sizes.masthead.width}
                />
            }

        </section>
    )
}

export default MastheadBlock
