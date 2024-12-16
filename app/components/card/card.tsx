import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import styles from './card.module.scss';

type Props = {
    // image: StaticImageData;
    image: string;
    price: string;
    title: string;
    url: string;
}

const Card: React.FC<Props> = ({ image, price, title, url }) => {
    return (
        <Link href={url} className={styles.card}>
            <div className={styles.image}>
                <span className={styles.price}>£{price}</span>
                <Image src={image} alt={title} height={400} width={400} />
            </div>
            <h3>
                {title}
            </h3>
            <span className="faux-link">View more</span>
        </Link>
    )
};

export default Card;
