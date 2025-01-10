import Link from 'next/link';

import styles from './section-header.module.scss';

type SectionHeaderProps = {
    title: string;
    intro?: string;
    linkLabel?: string;
    linkUrl?: string;
    centered?: boolean
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, intro, linkLabel, linkUrl, centered }) => {
    return (
        <hgroup className={`${styles.sectionHeader} ${centered ? styles.centered : ''}`}>
            <h2>{title}</h2>
            {intro && <p>{intro}</p>}
            {linkLabel && linkUrl && <Link href={linkUrl} title={linkLabel} className="text-link">{linkLabel}</Link>}
        </hgroup>
    )
}

export default SectionHeader;
