'use client';
import ContactForm from '@/app/components/contact-form/contact-form';
import Container from '@/app/components/container/container';
import ImageExpander from '@/app/components/image-expander/image-expander';
import { useModal } from '@/app/context/ModalContext';
import { categoryMap } from "@/app/lib/categoryMap";
import { ProductType } from '@/app/lib/types';
import Link from 'next/link';
import { useState } from "react";

import styles from './product-details.module.scss';

type ProductDetailsType = {
    product: ProductType
}

type Tab = { id: string; label: string };

const image = {
    alt: 'Image 1', height: 1400, src: 'https://picsum.photos/1400/1400', thumbHeight: 790, thumbWidth: 940, width: 1400
}

const ProductDetails: React.FC<ProductDetailsType> = ({ product }) => {
    const categoryName = categoryMap[product.category];

    // Define available tabs dynamically
    const availableTabs: (null | Tab)[] = [
        product.description ? { id: "description", label: "Description" } : null,
        product.specification?.length
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

    return (
        <>

            <Container className={styles.container}>

                <div className={styles.leadImage}>
                    <ImageExpander alt={image.alt}
                        height={image.height}
                        src={image.src}
                        thumbHeight={image.thumbHeight}
                        thumbWidth={image.thumbWidth}
                        width={image.width}
                    />
                </div>

                <div className={styles.intro}>
                    <Link className={styles.categoryLink} href={`/products/${product.category}`} title="">{categoryName}</Link>
                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.price}>&pound;{product.price}</p>

                    <div className={styles.synopsis} dangerouslySetInnerHTML={{ __html: product.synopsis }} />

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
                            {activeTab === "description" && (
                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                            )}
                            {activeTab === "specification" && (
                                <table className={styles.specificationTable}>
                                    <tbody>
                                        {product.specification.map((spec, index) => (
                                            <tr key={index}>
                                                <td><strong>{spec.key}</strong></td>
                                                <td>{spec.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {activeTab === "payment-delivery" && (
                                <p>Payment & Delivery details go here...</p>
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
