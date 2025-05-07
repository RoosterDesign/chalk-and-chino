'use client';
import { useModal } from '@/app/context/ModalContext';
import ContactForm from '@/components/contact-form/contact-form';
import Container from '@/components/container/container';
import ImageExpander from '@/components/image-expander/image-expander';
import TruncatedText from '@/components/truncated-text/truncated-text';
import { Product } from '@/payload-types'
import Link from 'next/link';
import { useState } from "react";

import styles from './product-details.module.scss';

type ProductDetailsType = {
    defaultDeliveryText: any;
    product: Product
}

type Tab = { id: string; label: string };

const ProductDetails: React.FC<ProductDetailsType> = ({ product, defaultDeliveryText }) => {

    // Define available tabs dynamically
    const availableTabs: (null | Tab)[] = [
        product.description ? { id: "description", label: "Description" } : null,
        product.specifications?.length
            ? { id: "specification", label: "Specification" }
            : null,
        { id: "payment-delivery", label: "Payment & Delivery" },
    ];

    // Remove null values
    const tabs: Tab[] = availableTabs.filter((tab): tab is Tab => tab !== null);

    const defaultTab = tabs.length > 0 ? tabs[0].id : "";
    const [activeTab, setActiveTab] = useState(defaultTab);

    const { openModal } = useModal();

    const handleOpenModal = () => {
        openModal(
            <ContactForm hasHeader product={product} subtitle="You are enquiring about" title={`${product.name} - £${product.price}`} />
        )
    };

    const deliveryDetails = product.customPaymentDelivery ? product.customPaymentDelivery : defaultDeliveryText

    return (
        <>

            <Container className={styles.container}>

                {typeof product.heroImage === 'object' && product.heroImage?.url && (
                    <div className={styles.leadImage}>
                        <ImageExpander alt={product.heroImage.alt || ''}
                            height={product.heroImage.height!}
                            src={product.heroImage.url}
                            thumbHeight={790}
                            thumbWidth={940}
                            width={product.heroImage.width!}
                        />
                    </div>
                )}

                <div className={styles.intro}>

                    {typeof product.category === 'object' && (
                        <Link
                            className={styles.categoryLink}
                            href={`/products/${product.category.slug}`}
                            title={product.category.name}
                        >
                            {product.category.name}
                        </Link>
                    )}

                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.price}>&pound;{product.price}</p>

                    <div className={styles.synopsis}>{product.summary}</div>

                    <button className="btn" onClick={handleOpenModal} title="Enquire about this item">Enquire about this item</button>
                </div>

                {tabs.length > 0 && (

                    <div className={styles.tabs}>
                        <div className={styles.tabHeader}>
                            {tabs.map((tab) => (
                                <button
                                    className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className={styles.tabContent}>
                            {activeTab === "description" && product.description && (
                                <TruncatedText text={product.description} />
                            )}
                            {activeTab === "specification" && product.specifications && (
                                <table className={styles.specificationTable}>
                                    <tbody>
                                        {product.specifications.map((spec, index) => (
                                            <tr key={index}>
                                                <td><strong>{spec.label}</strong></td>
                                                <td>{spec.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {activeTab === "payment-delivery" && (
                                <p>{deliveryDetails}</p>
                            )}
                        </div>

                    </div>
                )}

                <div className={styles.bg}></div>

            </Container >
        </>
    )
}

export default ProductDetails;
