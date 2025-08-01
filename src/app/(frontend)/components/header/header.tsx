"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Container from "@/app/components/container/container";
import Logo from "@/app/components/logo/logo";
import NavLinks from "@/app/components/nav-links/nav-links";
import ProductsNav from "@/app/components/products-nav/products-nav";
import SocialLinks from "@/app/components/social-links/social-links";
import { useIsMobile } from "@/lib/hooks";
import { NavItem } from "@/lib/types";

import styles from "./header.module.scss";

type HeaderProps = {
    mainNavItems: NavItem[];
    productCategories: NavItem[];
};

const Header: React.FC<HeaderProps> = ({ mainNavItems, productCategories }) => {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);

    const isMobile = useIsMobile(992);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const toggleBurgerMenu = () => {
        setIsOpen(!isOpen);
    };

    const combinedNavItems = isMobile
        ? mainNavItems.map((item) =>
              item.url === "/products"
                  ? { ...item, children: productCategories.slice(1) }
                  : item
          )
        : mainNavItems;

    return (
        <header className={styles.header}>
            <div className={styles.topHeader}>
                <Container className={styles.container}>
                    <Logo />
                    <nav
                        className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}
                    >
                        <NavLinks
                            isPrimary
                            navContext="main"
                            navItems={combinedNavItems}
                        />
                    </nav>
                    <SocialLinks />
                    <button
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        className={`${styles.burgerMenu} ${isOpen ? styles.burgerMenuOpen : ""}`}
                        onClick={toggleBurgerMenu}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </Container>
            </div>

            {!isMobile && <ProductsNav productCategories={productCategories} />}
        </header>
    );
};

export default Header;
