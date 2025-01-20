'use client';

import Container from '@/app/components/container/container';
import Logo from '@/app/components/logo/logo';
import NavLinks from '@/app/components/nav-links/nav-links';
import ProductsNav from '@/app/components/products-nav/products-nav';
import SocialLinks from '@/app/components/social-links/social-links';
import mainNavItems from '@/app/data/nav.json';
import { productNavItems } from '@/app/data/productNav';
import { useIsMobile } from '@/app/lib/hooks'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './header.module.scss';
const Header: React.FC = () => {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);

    const isMobile = useIsMobile(992);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const toggleBurgerMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header className={styles.header}>

            <div className={styles.topHeader}>
                <Container className={styles.container}>
                    <Logo />
                    <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
                        <NavLinks isPrimary navItems={mainNavItems} />
                        {isMobile && <ProductsNav productNavItems={productNavItems} />}
                    </nav>
                    <SocialLinks />
                    <button className={`${styles.burgerMenu} ${isOpen ? styles.burgerMenuOpen : ''}`} onClick={toggleBurgerMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </Container>
            </div>

            {!isMobile && <ProductsNav productNavItems={productNavItems} />}

        </header>
    )
}

export default Header;
