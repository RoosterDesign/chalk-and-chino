"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Media } from "@/payload-types";

import { useModal } from "@/app/context/ModalContext";
import Container from "@/components/container/container";

// Dynamically import ContactForm - only loads when modal opens
const ContactForm = dynamic(
    () => import("@/components/contact-form/contact-form"),
    { ssr: false }
);
import ImageExpander from "@/components/image-expander/image-expander";
import TruncatedText from "@/components/truncated-text/truncated-text";
import { Product } from "@/payload-types";

import styles from "./product-details.module.scss";

type ProductDetailsProps = {
    defaultDeliveryText: string;
    product: Product;
};

type Tab = { id: string; label: string };

const ProductDetails: React.FC<ProductDetailsProps> = ({
    product,
    defaultDeliveryText,
}) => {
    // Tabs setup
    const availableTabs: (null | Tab)[] = [
        product.description
            ? { id: "description", label: "Description" }
            : null,
        product.specifications?.length
            ? { id: "specification", label: "Specification" }
            : null,
        { id: "payment-delivery", label: "Payment & Delivery" },
    ];
    const tabs: Tab[] = availableTabs.filter((t): t is Tab => t !== null);
    const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");

    // Modal
    const { openModal } = useModal();
    const handleOpenModal = () => {
        openModal(
            <ContactForm
                hasHeader
                product={product}
                subtitle="You are enquiring about"
                title={`${product.name} – £${product.price}`}
            />
        );
    };

    // Delivery text
    const deliveryDetails =
        product.customPaymentDelivery ?? defaultDeliveryText;

    // Image sizing with fallback defaults
    let heroImage: Media | undefined;
    let thumbUrl = "";
    let thumbW = 0;
    let thumbH = 0;
    let fullUrl = "";

    if (
        typeof product.heroImage === "object" &&
        product.heroImage !== null &&
        "sizes" in product.heroImage
    ) {
        heroImage = product.heroImage;

        const galleryThumb = heroImage.sizes?.thumbnail;
        const modalPrev = heroImage.sizes?.modalPreview;

        // Always end up with a string and numbers
        thumbUrl = galleryThumb?.url ?? heroImage.url ?? "";
        thumbW = galleryThumb?.width ?? heroImage.width ?? 0;
        thumbH = galleryThumb?.height ?? heroImage.height ?? 0;
        fullUrl = modalPrev?.url ?? heroImage.url ?? "";
    }

    return (
        <Container className={styles.container}>
            <div className={styles.leadImage}>
                {heroImage &&
                fullUrl &&
                thumbUrl &&
                thumbW > 0 &&
                thumbH > 0 ? (
                    <ImageExpander
                        alt={heroImage.alt ?? ""}
                        src={fullUrl}
                        thumbHeight={thumbH}
                        thumbSrc={thumbUrl}
                        thumbWidth={thumbW}
                    />
                ) : (
                    <Image
                        alt=""
                        height={615}
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        src="/no-thumbnail.png"
                        width={820}
                    />
                )}
            </div>

            <div className={styles.intro}>
                {typeof product.category === "object" && (
                    <Link
                        className={styles.categoryLink}
                        href={`/products/${product.category.slug}`}
                        prefetch={true}
                        title={product.category.name}
                    >
                        {product.category.name}
                    </Link>
                )}
                <h1 className={styles.title}>{product.name}</h1>
                <p className={styles.price}>
                    {product._status === "published" ? (
                        `£${product.price}`
                    ) : (
                        <span className={styles.sold}>SOLD</span>
                    )}
                </p>
                <div className={styles.synopsis}>{product.summary}</div>
                {product._status === "published" && (
                    <button
                        className="btn"
                        onClick={handleOpenModal}
                        title="Enquire about this item"
                    >
                        Enquire about this item
                    </button>
                )}
            </div>

            {tabs.length > 0 && (
                <div className={styles.tabs}>
                    <div className={styles.tabHeader}>
                        {tabs.map((tab) => (
                            <button
                                className={`${styles.tab} ${
                                    activeTab === tab.id ? styles.tabActive : ""
                                }`}
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
                        {activeTab === "specification" &&
                            product.specifications && (
                                <table className={styles.specificationTable}>
                                    <tbody>
                                        {product.specifications.map(
                                            (spec, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <strong>
                                                            {spec.label}
                                                        </strong>
                                                    </td>
                                                    <td>{spec.value}</td>
                                                </tr>
                                            )
                                        )}
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
        </Container>
    );
};

export default ProductDetails;
