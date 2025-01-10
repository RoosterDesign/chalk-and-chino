import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { NavItem } from '@/app/lib/types'
import styles from './nav-links.module.scss';

type NavLinksProps = {
    navItems: NavItem[];
    isPrimary?: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ navItems, isPrimary }) => {
    const currentPath = usePathname();

    return (
        <ul className={`${styles.navLinks} ${isPrimary ? styles.isPrimary : ''} `}>
            {navItems.map((item, i) =>
                <li key={i}>
                    <Link href={item.url} title={item.title} className={currentPath === item.url ? styles.isActive : ''}>{item.label}
                    </Link>
                </li>
            )}
        </ul>
    )
}

export default NavLinks;
