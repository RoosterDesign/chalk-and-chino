import { useModal } from '@/context/ModalContext';
import { ImageExpanderType } from '@/lib/types';
import Image from 'next/image';

import styles from './image-expander.module.scss';

const ImageExpander: React.FC<ImageExpanderType> = ({ alt, className, height, src, thumbHeight, thumbWidth, width }) => {
    const { openModal } = useModal();

    const handleOpenModal = () => {
        openModal(
            <Image alt={alt} height={height} src={src} width={width} />,
            true
        )
    };

    return (
        <div className={`${styles.img} ${className || ""}`} >
            <Image
                alt={alt}
                height={thumbHeight}
                onClick={handleOpenModal}
                src={src}
                width={thumbWidth}
            />
            <span className={styles.expandButton}><svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.213 1a1 1 0 0 0-1-1h-9a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0V1ZM0 22.213a1 1 0 0 0 1 1h9a1 1 0 1 0 0-2H2v-8a1 1 0 1 0-2 0v9ZM21.506.293.293 21.506l1.414 1.414L22.92 1.707 21.506.293Z" /></svg></span>
        </div >
    )
}

export default ImageExpander;
