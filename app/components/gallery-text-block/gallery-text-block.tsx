import Image from 'next/image';
import Link from 'next/link';
import Container from '@/app/components/container/container';

import styles from './gallery-text-block.module.scss'

type GalleryTextBlockProps = {
    atTop?: boolean;  // Add no margin class to the section if true, default is false.  // default: false
    title: string;
    children: React.ReactNode;
    buttonLink?: string;
    buttonLabel?: string;
}

const GalleryTextBlock: React.FC<GalleryTextBlockProps> = ({ atTop, title, children, buttonLink, buttonLabel }) => {
    return (
        <section className={`${styles.GalleryTextBlock} ${atTop ? styles.atTop : ''}`}>
            <Container className={styles.container}>

                <div className={styles.content}>
                    <h2>{title}</h2>
                    {children}

                    {buttonLink && <Link href={buttonLink} className="btn">{buttonLabel}</Link>}
                </div>

                <div className={styles.gallery}>
                    <Image src="https://picsum.photos/390/480" alt="" height={480} width={330} />
                    <Image src="https://picsum.photos/390/480" alt="" height={480} width={330} />
                    <Image src="https://picsum.photos/390/480" alt="" height={480} width={330} />
                </div>

            </Container>
        </section>
    )
}

export default GalleryTextBlock;
