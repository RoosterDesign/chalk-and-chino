import styles from './container.module.scss'

type Props = {
    children: React.ReactNode,
    className?: string
}

const Container: React.FC<Props> = ({ children, className }) => {
    return (
        <div className={`${styles.container} ${className || ''}`}>
            {children}
        </div>
    )
}

export default Container;
