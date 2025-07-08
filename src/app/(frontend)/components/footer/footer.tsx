"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { CategoryType } from "@/lib/types";

import Container from "@/app/components/container/container";
import Logo from "@/app/components/logo/logo";
import SocialLinks from "@/app/components/social-links/social-links";
import { NavItem } from "@/lib/types";

import styles from "./footer.module.scss";

type FooterProps = {
    footerNavItems: NavItem[];
    footerText: string;
    mainNavItems: NavItem[];
    productCategories: CategoryType[];
};

const Footer: React.FC<FooterProps> = ({
    mainNavItems,
    footerText,
    footerNavItems,
    productCategories,
}) => {
    const currentPath = usePathname();
    const year = new Date().getFullYear();

    const isInProductsSection = currentPath.startsWith("/products");

    return (
        <footer className={styles.footer}>
            <Container className={styles.container}>
                <div className={styles.footerCol}>
                    <Logo className={styles.logo} />
                    {footerText && <p>{footerText}</p>}
                </div>

                <div className={styles.footerCol}>
                    <h4>Navigation</h4>
                    <ul className={styles.footerLinks}>
                        {mainNavItems.map((item, i) => {
                            const isActive =
                                item.url === "/products"
                                    ? isInProductsSection
                                    : currentPath === item.url;
                            return (
                                <li key={i}>
                                    <Link
                                        className={
                                            isActive ? styles.isActive : ""
                                        }
                                        href={item.url}
                                        title={item.label}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className={styles.footerCol}>
                    <h4>Product Categories</h4>
                    <ul className={styles.footerLinks}>
                        {productCategories.map((item, i) => (
                            <li key={i}>
                                <Link
                                    className={
                                        currentPath === item.url
                                            ? styles.isActive
                                            : ""
                                    }
                                    href={item.url}
                                    title={item.label}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.footerCol}>
                    <h4>Follow Chalk & Chino</h4>
                    <SocialLinks />
                </div>

                <div className={styles.footerBottom}>
                    <ul className={styles.copyright}>
                        <li>&copy; {year} Chalk & Chino</li>
                        {footerNavItems.map((item, i) => (
                            <li key={i}>
                                <Link href={item.url} title={item.label}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <p>
                        Website by{" "}
                        <a
                            href="https://www.roosterdesign.co.uk/"
                            target="_blank"
                            title="Front-End Developer and UI/UX Designer based in Leamington Spa, Warwickshire"
                        >
                            Rooster Design
                        </a>
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
