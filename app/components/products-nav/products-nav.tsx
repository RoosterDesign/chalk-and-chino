import NavLinks from '@/app/components/nav-links/nav-links';
import Container from '@/app/components/container/container';
import { NavItem } from '@/app/types/types'
import styles from './products-nav.module.scss';

type Props = {
    productNavItems: NavItem[];
}

const ProductsNav: React.FC<Props> = ({ productNavItems }) => {
    return (
        <div className={`${styles.productNav}`}>
            <Container className={styles.container}>
                <NavLinks navItems={productNavItems} />
            </Container>
        </div >
    )
}

export default ProductsNav;
