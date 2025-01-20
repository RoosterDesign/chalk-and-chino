import SectionHeader from '@/app/components/section-header/section-header';

import styles from './map.module.scss';

const Map: React.FC = () => {
    return (
        <section className={styles.map}>
            <SectionHeader centered intro="Nunc aliquet fermentum sem vitae vulputate. Nullam nec libero tempus, porttitor tellus a Nunc aliquet." linkLabel="Get in touch" linkUrl="/contact" title="Where I'm Based" />
            <div className={styles.mapContainer}>
                <iframe src="https://snazzymaps.com/embed/657451"></iframe>
            </div>
        </section>
    )
}

export default Map;
