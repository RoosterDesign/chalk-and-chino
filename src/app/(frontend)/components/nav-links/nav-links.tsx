"use client";

import { NavItem } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./nav-links.module.scss";

type NavLinksProps = {
    isPrimary?: boolean;
    navContext: "category" | "main";
    navItems: NavItem[];
};

const NavLinks: React.FC<NavLinksProps> = ({
    isPrimary,
    navItems,
    navContext,
}) => {
    const currentPath = usePathname();

    return (
        <ul
            className={`${styles.navLinks} ${isPrimary ? styles.isPrimary : ""} `}
        >
            {navItems.map((item, i) => {
                let isActive = false;

                if (navContext === "main") {
                    // Main nav: only /products* for Products, exact for everything else
                    if (item.url === "/products") {
                        isActive = currentPath.startsWith("/products");
                    } else {
                        isActive = currentPath === item.url;
                    }
                } else {
                    // Category nav:
                    if (item.url === "/products") {
                        // “All Products” only on the root products page
                        isActive = currentPath === "/products";
                    } else {
                        // Categories (and their children) match any deeper path
                        isActive = currentPath.startsWith(item.url);
                    }
                }

                return (
                    <li key={i}>
                        <Link
                            className={isActive ? styles.isActive : ""}
                            href={item.url}
                            title={item.label}
                        >
                            {item.label}
                        </Link>

                        {item.children && (
                            <ul className={styles.submenu}>
                                {item.children.map((child) => (
                                    <li key={child.url}>
                                        <Link
                                            className={
                                                currentPath.startsWith(
                                                    child.url
                                                )
                                                    ? styles.isActive
                                                    : ""
                                            }
                                            href={child.url}
                                        >
                                            {child.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default NavLinks;
