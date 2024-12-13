import Link from 'next/link';
import styles from './logo.module.scss'

type Props = {
    className?: string
}

const Logo: React.FC<Props> = ({ className }) => {
    return (
        <Link href="/" className={`${styles.logo} ${className || ''}`}>Chalk &amp; Chino</Link>
    )
}

export default Logo;
