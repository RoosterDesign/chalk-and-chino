/* eslint-disable @next/next/no-img-element */
import styles from './social-links.module.scss';

type SocialLinks = {
    alt: string;
    image: string;
    title: string;
    url: string;
}

const socialLinks: SocialLinks[] = [
    {
        alt: 'Instagram',
        image: '/instagram.svg',
        title: 'Follow me on Instagram',
        url: '#',
    },
    {
        alt: 'Facebook',
        image: '/facebook.svg',
        title: 'View my Facebook page',
        url: '#',
    },
    {
        alt: 'Email Me',
        image: '/envelope.svg',
        title: 'Email Me',
        url: '#',
    }
];

const SocialLinks: React.FC = () => {
    return (
        <ul className={styles.socialLinks}>
            {socialLinks.map((socialLink, i) =>
                <li key={i}>
                    <a href={socialLink.url} title={socialLink.title}>
                        <img alt={socialLink.alt} height={32} src={socialLink.image} width={32} />
                    </a>
                </li>
            )}
        </ul>
    )
}

export default SocialLinks;
