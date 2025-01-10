import styles from './container.module.scss'

type ContainerProps = {
    children: React.ReactNode,
    className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return (
        <div className={`${styles.container} ${className || ''}`}>
            {children}
        </div>
    )
}

export default Container;
