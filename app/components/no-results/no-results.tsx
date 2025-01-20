import Container from '@/app/components/container/container';
import SectionHeader from '@/app/components/section-header/section-header';
import Link from 'next/link';

import styles from './no-results.module.scss';

type NoResultsProps = {
    content: string;
}

const NoResults: React.FC<NoResultsProps> = ({ content }) => {
    return (
        <Container className={styles.noResultsContainer}>
            <SectionHeader centered intro="To return to all our products, please" linkLabel="click here" linkUrl="/products" title={content} />
        </Container>
    )
}

export default NoResults;
