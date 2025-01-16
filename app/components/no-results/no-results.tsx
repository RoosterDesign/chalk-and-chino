import Link from 'next/link';
import Container from '@/app/components/container/container';
import SectionHeader from '@/app/components/section-header/section-header';

import styles from './no-results.module.scss';

type NoResultsProps = {
    content: string;
}

const NoResults: React.FC<NoResultsProps> = ({ content }) => {
    return (
        <Container className={styles.noResultsContainer}>
            <SectionHeader title={content} intro="To return to all our products, please" linkUrl="/products" linkLabel="click here" centered />
        </Container>
    )
}

export default NoResults;
