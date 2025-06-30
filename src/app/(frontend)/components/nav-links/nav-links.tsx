"use client";

import { NavItem } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./nav-links.module.scss";

type NavLinksProps = {
    isPrimary?: boolean;
    navItems: NavItem[];
};

const NavLinks: React.FC<NavLinksProps> = ({ isPrimary, navItems }) => {
    const currentPath = usePathname();

    return (
        <ul
            className={`${styles.navLinks} ${isPrimary ? styles.isPrimary : ""} `}
        >
            {navItems.map((item, i) => (
                <li key={i}>
                    <Link
                        className={
                            item.url === "/products" || item.url === "/"
                                ? currentPath === item.url
                                    ? styles.isActive
                                    : ""
                                : currentPath.startsWith(item.url)
                                  ? styles.isActive
                                  : ""
                        }
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
                                            currentPath.startsWith(child.url)
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
            ))}
        </ul>
    );
};

export default NavLinks;
