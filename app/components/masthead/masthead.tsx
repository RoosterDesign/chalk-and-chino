import Container from '@/app/components/container/container';
import Image from 'next/image';

import styles from './masthead.module.scss';

type MastheadProps = {
    title: string;
}

const Masthead: React.FC<MastheadProps> = ({ title }) => {
    return (
        <section className={`${styles.masthead}`}>
            <Container className={styles.container}>
                <h1>{title}</h1>
            </Container>
            <Image alt="" height={300} src="https://picsum.photos/1920/300" width={1920} />
        </section>
    )
}

export default Masthead;
