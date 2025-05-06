import Container from '@/app/components/container/container';
import Image from 'next/image';

import styles from './masthead.module.scss';

type MastheadProps = {
    image?: { alt?: string; url: string; } | string;
    title: string;
}

const Masthead: React.FC<MastheadProps> = ({ title, image }) => {
    return (
        <section className={`${styles.masthead}`}>
            <Container className={styles.container}>
                <h1>{title}</h1>
            </Container>
            <Image
                alt={typeof image === 'string' ? '' : image?.alt || ''}
                className={styles.image}
                height={300}
                src={
                    typeof image === 'string'
                        ? image
                        : image?.url || '/images/placeholder.jpg'
                }
                width={1920}
            />
        </section>
    )
}

export default Masthead;
