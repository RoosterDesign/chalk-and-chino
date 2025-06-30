import Container from '@/app/components/container/container';
import SectionHeader from '@/app/components/section-header/section-header';

import styles from './no-results.module.scss';

type NoResultsProps = {
    content: string;
}

const NoResults: React.FC<NoResultsProps> = ({ content }) => {
    return (
        <Container className={styles.noResultsContainer}>
            <SectionHeader centered linkLabel="click here" linkUrl="/products" synopsis="To return to all our products, please" title={content} />
        </Container>
    )
}

export default NoResults;
