'use client';

import type { CategoryType } from '@/lib/types';

import Container from '@/app/components/container/container';
import Logo from '@/app/components/logo/logo';
import SocialLinks from '@/app/components/social-links/social-links';
import { NavItem } from '@/lib/types'
import Link from 'next/link';
import { usePathname } from 'next/navigation'

import styles from './footer.module.scss';

type FooterProps = {
    footerNavItems: NavItem[]
    mainNavItems: NavItem[]
    productCategories: CategoryType[]
}

const Footer: React.FC<FooterProps> = ({ mainNavItems, footerNavItems, productCategories }) => {
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
                        {productCategories.map((item, i) =>
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
                        {footerNavItems.map((item, i) =>
                            <li key={i}>
                                <Link href={item.url} title={item.label}>{item.label}
                                </Link>
                            </li>
                        )}
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
