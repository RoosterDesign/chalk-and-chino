import type { GalleryTextBannerBlock as GalleryTextBannerBlockProps } from '@/payload-types'

import Container from '@/app/components/container/container';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss'

const GalleryTextBannerBlock: React.FC<GalleryTextBannerBlockProps> = ({ atTop, reverse, image1, image2, image3, title, body, cta_button }) => {

    return (
        <section className={`${styles.GalleryTextBlock} ${atTop ? styles.atTop : ''}`}>
            <Container className={styles.container}>

                <div className={styles.content}>
                    <h2>{title}</h2>
                    {body && <RichText data={body} />}
                    {cta_button?.url && (
                        <Link className="btn" href={cta_button.url}>
                            {cta_button.label}
                        </Link>
                    )}
                </div>

                <div className={styles.gallery}>
                    {typeof image1 === 'object' &&
                        image1?.sizes?.galleryTextBanner?.url &&
                        typeof image1.sizes.galleryTextBanner.width === 'number' &&
                        typeof image1.sizes.galleryTextBanner.height === 'number' && (
                            <Image alt={image1.alt || ''} height={image1.sizes.galleryTextBanner.height} src={image1.sizes.galleryTextBanner.url} width={image1.sizes.galleryTextBanner.width} />
                        )}

                    {typeof image2 === 'object' &&
                        image2?.sizes?.galleryTextBanner?.url &&
                        typeof image2.sizes.galleryTextBanner.width === 'number' &&
                        typeof image2.sizes.galleryTextBanner.height === 'number' && (
                            <Image alt={image2.alt || ''} height={image2.sizes.galleryTextBanner.height} src={image2.sizes.galleryTextBanner.url} width={image2.sizes.galleryTextBanner.width} />
                        )}

                    {typeof image3 === 'object' &&
                        image3?.sizes?.galleryTextBanner?.url &&
                        typeof image3.sizes.galleryTextBanner.width === 'number' &&
                        typeof image3.sizes.galleryTextBanner.height === 'number' && (
                            <Image alt={image3.alt || ''} height={image3.sizes.galleryTextBanner.height} src={image3.sizes.galleryTextBanner.url} width={image3.sizes.galleryTextBanner.width} />
                        )}

                </div>

            </Container>
        </section>
    )
}

export default GalleryTextBannerBlock
