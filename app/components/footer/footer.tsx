'use client';

import { usePathname } from 'next/navigation'
import Link from 'next/link';
import Container from '@/app/components/container/container';
import SocialLinks from '@/app/components/social-links/social-links';
import Logo from '@/app/components/logo/logo';
import styles from './footer.module.scss';

import mainNavItems from '@/app/data/nav.json';
import productNavItems from '@/app/data/productNav.json';

const Footer: React.FC = () => {
    const currentPath = usePathname();

    return (
        <footer className={styles.footer}>
            <Container className={styles.container}>

                <div className={styles.footerCol}>
                    <Logo className={styles.logo} />
                    <p>Quisque a dapibus enim. Maecenas non varius felis, eget hendrerit lorem. Etiam eu vestibulum leo, eu consequat enim.</p>
                </div>

                <div className={styles.footerCol}>
                    <h3>Navigation</h3>
                    <ul className={styles.footerLinks}>
                        {mainNavItems.map((item, i) =>
                            <li key={i}>
                                <Link href={item.url} title={item.title} className={currentPath === item.url ? styles.isActive : ''}>{item.label}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

                <div className={styles.footerCol}>
                    <h3>Product Categories</h3>
                    <ul className={styles.footerLinks}>
                        {productNavItems.map((item, i) =>
                            <li key={i}>
                                <Link href={item.url} title={item.title} className={currentPath === item.url ? styles.isActive : ''}>{item.label}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

                <div className={styles.footerCol}>
                    <h3>Follow Chalk & Chino</h3>
                    <SocialLinks />
                </div>

                <div className={styles.footerBottom}>
                    <ul className={styles.copyright}>
                        <li>&copy; 2024 Chalk & Chino</li>
                        <li><Link href="/">Privacy Policy</Link></li>
                        <li><Link href="/">Cookie Policy</Link></li>
                    </ul>
                    <p>
                        Website by <a href="#" title="Front-End Developer and UI/UX Designer based in Leamington Spa, Warwickshire" target="_">Rooster Design</a>
                    </p>
                </div>

            </Container>
        </footer>
    )
}

export default Footer;
