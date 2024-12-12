/* eslint-disable @next/next/no-img-element */
import styles from './social-links.module.scss';

type SocialLinks = {
    url: string;
    image: string;
    title: string;
    alt: string;
}

const SocialLinks: React.FC = () => {

    const socialLinks: SocialLinks[] = [
        {
            url: '#',
            image: '/instagram.svg',
            title: 'Follow me on Instagram',
            alt: 'Instagram',
        },
        {
            url: '#',
            image: '/facebook.svg',
            title: 'View my Facebook page',
            alt: 'Facebook',
        }
    ];

    return (
        <ul className={styles.socialLinks}>
            {socialLinks.map((socialLink, i) =>
                <li key={i}>
                    <a href={socialLink.url} title={socialLink.title}>
                        <img src={socialLink.image} alt={socialLink.alt} width={32} height={32} />
                    </a>
                </li>
            )}
        </ul>
    )
}

export default SocialLinks;
