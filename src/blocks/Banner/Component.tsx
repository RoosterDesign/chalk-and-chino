import type { BannerBlock as BannerBlockProps } from '@/payload-types'

import Container from '@/app/components/container/container';
import { getImageData } from '@/lib/utils/getImageData'
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';

const BannerBlock: React.FC<BannerBlockProps> = ({ image, title, body, cta_button }) => {

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
            {typeof image === 'object' && image?.url &&
                <Image alt={image.alt || ''} height={1920} src={image.url} width={900} />
            }
        </section>
    )
}

export default BannerBlock
