import Link from 'next/link';

import styles from './section-header.module.scss';

type Props = {
    title: string;
    linkLabel?: string;
    linkUrl?: string;
}

const SectionHeader: React.FC<Props> = ({ title, linkLabel, linkUrl }) => {
    return (
        <hgroup className={styles.sectionHeader}>
            <h2>{title}</h2>
            {linkLabel && linkUrl && <Link href={linkUrl} title={linkLabel} className="text-link">{linkLabel}</Link>}
        </hgroup>
    )
}

export default SectionHeader;
