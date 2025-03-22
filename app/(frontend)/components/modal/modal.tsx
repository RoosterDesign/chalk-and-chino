import styles from './modal.module.scss';

type ModalProps = {
    children: React.ReactNode;
    className?: string;
    isImageOnly?: boolean;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isImageOnly, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className={styles.modal}>
                <div aria-modal="true" className={`${styles.modalContent} ${isImageOnly ? styles.imageOnly : ''}`}
                    role="dialog">
                    <button className={styles.modalClose} onClick={onClose}><svg fill="none" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M16.5 13.61 29.608.502A1.718 1.718 0 0 1 30.824 0c.925 0 1.718.742 1.718 1.716 0 .443-.167.883-.502 1.22L18.932 16.042l13.106 13.106a1.72 1.72 0 1 1-2.432 2.434L16.502 18.474 3.395 31.581a1.72 1.72 0 1 1-2.431-2.434l13.105-13.105L.961 2.936a1.723 1.723 0 0 1-.502-1.22C.459.742 1.252 0 2.178 0c.44 0 .882.167 1.217.502L16.5 13.61Z" fillRule="evenodd" /></svg></button>
                    {children}
                </div>
            </div>
            <div className={styles.modalMask} onClick={onClose}></div>
        </>
    )
}

export default Modal;
