'use client';

import Modal from '@/app/components/modal/modal';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Define the shape of the modal context using `type`
type ModalContextType = {
    closeModal: () => void;
    openModal: (content: ReactNode) => void;
};

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<null | ReactNode>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Enable client-side rendering after mount
    }, []);

    useEffect(() => {
        const html = document.documentElement;
        if (isModalOpen) {
            html.classList.add('no-scroll');
        } else {
            html.classList.remove('no-scroll');
        }
        return () => {
            html.classList.remove('no-scroll');
        };
    }, [isModalOpen]);

    const openModal = (content: ReactNode) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
    };

    if (!isClient) return null;

    return (
        <ModalContext.Provider value={{ closeModal, openModal }}>
            {children}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </Modal>
        </ModalContext.Provider>
    );
};

// Hook to use the context
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
