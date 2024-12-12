import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { NavItem } from '@/app/types/types'
import styles from './nav.module.scss';

type Props = {
    navItems: NavItem[];
}

const Nav: React.FC<Props> = ({ navItems }) => {
    const currentPath = usePathname();

    return (
        <ul className={styles.navLinks}>
            {navItems.map((item, i) =>
                <li key={i}>
                    <Link href={item.url} title={item.title} className={currentPath === item.url ? styles.isActive : ""}>{item.label}
                    </Link>
                </li>
            )}
        </ul>
    )
}

export default Nav;
