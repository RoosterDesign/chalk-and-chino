import Link from 'next/link';

import styles from './logo.module.scss'

type LogoProps = {
    className?: string
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <Link className={`${styles.logo} ${className || ''}`} href="/">Chalk &amp; Chino</Link>
    )
}

export default Logo;
