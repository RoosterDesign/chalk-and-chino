"use client";

import Link from "next/link";
import { useState } from "react";

import SectionHeader from "@/app/components/section-header/section-header";
import { Product, ProductCategory } from "@/payload-types";

import styles from "./contact-form.module.scss";
import FormInput from "./form-input/form-input";

type ContactFormProps = {
    hasHeader?: boolean;
    hasThanksLinks?: boolean;
    product?: Product;
    subtitle?: string;
    title?: string;
};

const ContactForm: React.FC<ContactFormProps> = ({
    hasHeader,
    hasThanksLinks,
    product,
    subtitle,
    title,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        enquiry: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        enquiry: "",
    });

    const [submitted, setSubmitted] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors: typeof errors = { name: "", email: "", enquiry: "" };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid.";
            isValid = false;
        }

        if (!formData.enquiry.trim()) {
            newErrors.enquiry = "Enquiry is required.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setProcessing(true);

        const categorySlug =
            typeof product?.category === "object" ? product?.category.slug : "";

        try {
            const payload = {
                ...formData,
                productName: product?.name,
                productPrice: product?.price,
                productUrl: `${window.location.origin}/products/${categorySlug}/${product?.slug}`,
            };

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: "", phone: "", email: "", enquiry: "" });
                setProcessing(false);
            } else {
                const data = await response.json();
                setSubmitError(data.error || "An error occurred.");
                setProcessing(false);
            }
        } catch (error) {
            setSubmitError("An error occurred while submitting the form.");
        }
    };

    return (
        <>
            {submitted ? (
                <div className={styles.thanks}>
                    <h2>Thank you for your enquiry.</h2>
                    <p>I will aim to respond to you ASAP.</p>
                    {hasThanksLinks && (
                        <p>
                            <Link href="/" title="Return to the homepage">
                                Return to the homepage
                            </Link>{" "}
                            or{" "}
                            <Link
                                href="/products"
                                title="View my available items"
                            >
                                view my available items
                            </Link>
                            .
                        </p>
                    )}
                </div>
            ) : (
                <>
                    {hasHeader && (
                        <SectionHeader
                            centered
                            subtitle={subtitle}
                            title={title}
                        />
                    )}
                    <form
                        className={styles.contactForm}
                        onSubmit={handleSubmit}
                    >
                        {processing && (
                            <div className={styles.processing}>
                                <span className={styles.spinner}></span>
                            </div>
                        )}
                        <div className={styles.formFields}>
                            <FormInput
                                error={errors.name}
                                label="Your name"
                                name="name"
                                onChange={handleChange}
                                placeholder="Please enter your name"
                                required
                                type="text"
                                value={formData.name}
                            />

                            <div className={styles.contactFormCol}>
                                <FormInput
                                    label="Your phone number"
                                    name="phone"
                                    onChange={handleChange}
                                    placeholder="Please enter phone number"
                                    type="text"
                                    value={formData.phone}
                                />
                            </div>
                            <div className={styles.contactFormCol}>
                                <FormInput
                                    error={errors.email}
                                    label="Your email address"
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="Please enter email address"
                                    required
                                    type="text"
                                    value={formData.email}
                                />
                            </div>
                            <FormInput
                                error={errors.enquiry}
                                label="Your enquiry"
                                name="enquiry"
                                onChange={handleChange}
                                placeholder="Please enter your name"
                                required
                                type="textarea"
                                value={formData.enquiry}
                            />

                            {submitError && (
                                <p className={styles.error}>{submitError}</p>
                            )}
                        </div>
                        <button className="btn" type="submit">
                            Send your enquiry
                        </button>
                    </form>
                </>
            )}
        </>
    );
};

export default ContactForm;
