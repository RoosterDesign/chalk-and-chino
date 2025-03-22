'use client';

import Container from '@/components/container/container';
import Logo from '@/components/logo/logo';
import SocialLinks from '@/components/social-links/social-links';
import mainNavItems from '@/data/nav.json';
import { productNavItems } from '@/data/productNav';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

import styles from './footer.module.scss';

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
                    <h4>Navigation</h4>
                    <ul className={styles.footerLinks}>
                        {mainNavItems.map((item, i) =>
                            <li key={i}>
                                <Link className={currentPath === item.url ? styles.isActive : ''} href={item.url} title={item.label}>{item.label}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

                <div className={styles.footerCol}>
                    <h4>Product Categories</h4>
                    <ul className={styles.footerLinks}>
                        {productNavItems.map((item, i) =>
                            <li key={i}>
                                <Link className={currentPath === item.url ? styles.isActive : ''} href={item.url} title={item.label}>{item.label}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

                <div className={styles.footerCol}>
                    <h4>Follow Chalk & Chino</h4>
                    <SocialLinks />
                </div>

                <div className={styles.footerBottom}>
                    <ul className={styles.copyright}>
                        <li>&copy; 2024 Chalk & Chino</li>
                        <li><Link href="/privacy" title="Privacy Policy">Privacy Policy</Link></li>
                        <li><Link href="/cookie-policy" title="Cookie Policy">Cookie Policy</Link></li>
                    </ul>
                    <p>
                        Website by <a href="#" target="_" title="Front-End Developer and UI/UX Designer based in Leamington Spa, Warwickshire">Rooster Design</a>
                    </p>
                </div>

            </Container>
        </footer>
    )
}

export default Footer;
