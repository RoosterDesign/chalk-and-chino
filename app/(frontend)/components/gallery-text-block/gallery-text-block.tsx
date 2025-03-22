import Container from '@/components/container/container';
import Image from 'next/image';
import Link from 'next/link';

import styles from './gallery-text-block.module.scss'

type GalleryTextBlockProps = {
    atTop?: boolean;  // Add no margin class to the section if true, default is false.  // default: false
    buttonLabel?: string;
    buttonLink?: string;
    children: React.ReactNode;
    title: string;
}

const GalleryTextBlock: React.FC<GalleryTextBlockProps> = ({ atTop, buttonLabel, buttonLink, children, title }) => {
    return (
        <section className={`${styles.GalleryTextBlock} ${atTop ? styles.atTop : ''}`}>
            <Container className={styles.container}>

                <div className={styles.content}>
                    <h2>{title}</h2>
                    {children}

                    {buttonLink && <Link className="btn" href={buttonLink}>{buttonLabel}</Link>}
                </div>

                <div className={styles.gallery}>
                    <Image alt="" height={480} src="https://picsum.photos/390/480" width={330} />
                    <Image alt="" height={480} src="https://picsum.photos/390/480" width={330} />
                    <Image alt="" height={480} src="https://picsum.photos/390/480" width={330} />
                </div>

            </Container>
        </section>
    )
}

export default GalleryTextBlock;
