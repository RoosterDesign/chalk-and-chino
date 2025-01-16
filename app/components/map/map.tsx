import styles from './map.module.scss';

type MapProps = {
    children: React.ReactNode;
}

const Map: React.FC<MapProps> = ({ children }) => {
    return (
        <section className={styles.map}>
            {children}
            <div className={styles.mapContainer}>
                <iframe src="https://snazzymaps.com/embed/657451"></iframe>
            </div>
        </section>
    )
}

export default Map;
