import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import styles from './card.module.scss';

type CardProps = {
    // image: StaticImageData;
    image: string;
    price: string;
    title: string;
    url: string;
}

const Card: React.FC<CardProps> = ({ image, price, title, url }) => {
    return (
        <Link href={url} className={styles.card}>
            <div className={styles.image}>
                <span className={styles.price}>£{price}</span>
                <Image src={image} alt={title} height={400} width={400} />
            </div>
            <p>
                {title}
            </p>
            <span className="faux-link">View more</span>
        </Link>
    )
};

export default Card;
