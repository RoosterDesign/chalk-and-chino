'use client';

import { useState, useEffect } from 'react';
import { useIsMobile } from '@/app/lib/hooks'
import { usePathname } from 'next/navigation';
import Container from '@/app/components/container/container';
import NavLinks from '@/app/components/nav-links/nav-links';
import ProductsNav from '@/app/components/products-nav/products-nav';
import SocialLinks from '@/app/components/social-links/social-links';
import Logo from '@/app/components/logo/logo';

import mainNavItems from '@/app/data/nav.json';
import productNavItems from '@/app/data/productNav.json';

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
                        <NavLinks navItems={mainNavItems} isPrimary />
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
