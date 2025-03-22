import Container from '@/components/container/container';
import NavLinks from '@/components/nav-links/nav-links';
import { NavItem } from '@/app/lib/types'

import styles from './products-nav.module.scss';

type ProductsNavProps = {
    productNavItems: NavItem[];
}

const ProductsNav: React.FC<ProductsNavProps> = ({ productNavItems }) => {
    return (
        <div className={`${styles.productNav}`}>
            <Container className={styles.container}>
                <NavLinks navItems={productNavItems} />
            </Container>
        </div >
    )
}

export default ProductsNav;
