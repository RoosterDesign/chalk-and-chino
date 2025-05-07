import Container from '@/app/components/container/container';
import SectionHeader from '@/app/components/section-header/section-header';

import styles from './map.module.scss';

const Map: React.FC = () => {
    return (
        <>
            <Container>
                <SectionHeader centered linkLabel="Get in touch" linkUrl="/contact" synopsis="Nunc aliquet fermentum sem vitae vulputate. Nullam nec libero tempus, porttitor tellus a Nunc aliquet." title="Where I'm Based" />
            </Container>
            <div className={styles.mapContainer}>
                <iframe src="https://snazzymaps.com/embed/657451"></iframe>
            </div>
        </>
    )
}

export default Map;
