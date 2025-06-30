import Container from '@/app/components/container/container';
import NavLinks from '@/app/components/nav-links/nav-links';
import { NavItem } from '@/lib/types'

import styles from './products-nav.module.scss';

type ProductsNavProps = {
    productCategories: NavItem[];
}

const ProductsNav: React.FC<ProductsNavProps> = ({ productCategories }) => {
    return (
        <div className={`${styles.productNav}`}>
            <Container className={styles.container}>
                <NavLinks navItems={productCategories} />
            </Container>
        </div >
    )
}

export default ProductsNav;
