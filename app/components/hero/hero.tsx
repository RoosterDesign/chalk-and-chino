
import Container from '@/app/components/container/container';

import styles from './hero.module.scss';

const Hero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <Container className={styles.container}>
                <h1>Bringing new life into timeless pieces</h1>
                <p>Crafting unique, sustainable furniture from forgotten finds. Each piece tells a story, adding warmth and character to your space.</p>
                <p><a href="" className="" title="">Browse my items</a></p>
            </Container>

            <picture>
                <img src="https://picsum.photos/1920/750" alt="" className="img-full" />
            </picture>
        </section>
    )
}

export default Hero;
