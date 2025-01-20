import Link from 'next/link';

import styles from './section-header.module.scss';

type SectionHeaderProps = {
    centered?: boolean
    intro?: string;
    linkLabel?: string;
    linkUrl?: string;
    title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ centered, intro, linkLabel, linkUrl, title }) => {
    return (
        <hgroup className={`${styles.sectionHeader} ${centered ? styles.centered : ''}`}>
            <h2>{title}</h2>
            {intro && <p>
                {intro}
                {linkLabel && linkUrl && <> <Link className="text-link" href={linkUrl} title={linkLabel}>{linkLabel}</Link></>}
            </p>}

        </hgroup>
    )
}

export default SectionHeader;
