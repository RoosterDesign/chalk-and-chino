'use client';

import { useState } from 'react';
import { useIsMobile } from '@/app/hooks/isMobile'
import Link from 'next/link';
import Container from '@/app/components/container/container';
import Nav from '@/app/components/nav/nav';
import ProductsNav from '@/app/components/products-nav/products-nav';
import SocialLinks from '@/app/components/social-links/social-links';
import { NavItem } from '@/app/types/types'
import styles from './header.module.scss';

const mainNavItems: NavItem[] = [
    {
        url: '/',
        label: 'Home',
        title: ""
    },
    {
        url: '/about',
        label: 'About',
        title: ""
    },
    {
        url: '/contact',
        label: 'Contact',
        title: ""
    }
];

const productNavItems: NavItem[] = [
    {
        url: '#',
        label: 'All products',
        title: ""
    },
    {
        url: '#',
        label: 'Furniture',
        title: ""
    },
    {
        url: '#',
        label: 'Faux florals & upcycled pots',
        title: ""
    },
    {
        url: '#',
        label: 'Home decor accessories',
        title: ""
    }
];

const Header: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);

    const isMobile = useIsMobile(992);

    const toggleBurgerMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header className={styles.header}>

            <div className={styles.topHeader}>
                <Container className={styles.container}>
                    <Link href="/" className={styles.header__logo}>Chalk &amp; Chino</Link>

                    <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
                        <Nav navItems={mainNavItems} />
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
