import Image from 'next/image';
import { useModal } from '@/app/context/ModalContext';
import { ImageExpanderType } from '@/app/lib/types';
import styles from './image-expander.module.scss';

const ImageExpander: React.FC<ImageExpanderType> = ({ src, alt, thumbWidth, thumbHeight, width, height }) => {
    const { openModal } = useModal();

    const handleOpenModal = () => {
        openModal(
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
            />
        )
    };

    return (
        <>
            <Image
                className={styles.img}
                src={src}
                alt={alt}
                width={thumbWidth}
                height={thumbHeight}
                onClick={handleOpenModal}
            />
            <span className={styles.expandButton}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M23.213 1a1 1 0 0 0-1-1h-9a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0V1ZM0 22.213a1 1 0 0 0 1 1h9a1 1 0 1 0 0-2H2v-8a1 1 0 1 0-2 0v9ZM21.506.293.293 21.506l1.414 1.414L22.92 1.707 21.506.293Z" /></svg></span>
        </>
    )
}

export default ImageExpander;
