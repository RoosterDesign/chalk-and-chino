import Link from 'next/link';

import styles from './section-header.module.scss';

export type SectionHeaderProps = {
    centered?: boolean;
    linkLabel?: string;
    linkUrl?: string;
    subtitle?: string;
    synopsis?: string;
    title?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ centered,
    subtitle,
    synopsis,
    linkLabel,
    linkUrl,
    title, }) => {

    return (
        <div className={`${styles.sectionHeader} ${centered ? styles.centered : ''}`}>
            <hgroup>
                {subtitle && subtitle}
                <h2>{title}</h2>
                {!centered && linkUrl && <Link className="text-link" href={linkUrl} title={linkLabel}>{linkLabel}</Link>}
            </hgroup>
            {
                centered ?
                    <p>
                        {synopsis && synopsis} {linkUrl && <Link className="text-link" href={linkUrl} title={linkLabel}>{linkLabel}</Link>}
                    </p>
                    :
                    synopsis && <p>{synopsis}</p>
            }
        </div>
    )
}

export default SectionHeader;
