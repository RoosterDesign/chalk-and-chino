import Link from 'next/link';
import Image from 'next/image';
import Container from '@/app/components/container/container';
import styles from './banner.module.scss';

const Banner: React.FC = () => {
    return (
        <section className={`${styles.banner} section-spacing`}>
            <Container>
                <h2>Lorem ipsum dolor sit amet</h2>
                <p>Nunc feugiat erat leo, non lacinia leo tempus quis. Nulla in est dolor. Quisque vel consectetur dui. Aenean pharetra leo orci, nec eleifend urna volutpat at.</p>
                <Link href="#" className="btn">Find out more</Link>
            </Container>
            <Image src="https://picsum.photos/1920/900" alt="" height={1920} width={900} />
        </section>
    )
}

export default Banner;
