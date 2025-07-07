import type { ContactBlock as ContactBlockProps } from "@/payload-types";

import ContactForm from "@/app/components/contact-form/contact-form";
import Container from "@/app/components/container/container";
import Map from "@/blocks/Map/Component";
import Testimonials from "@/blocks/Testimonials/Component";

import styles from "./styles.module.scss";

const ContactBlock: React.FC<ContactBlockProps> = ({ heading, introText }) => {
    return (
        <>
            <section className={styles.contact}>
                <Container>
                    {heading && <h1>{heading}</h1>}
                    {introText && <p>{introText}</p>}
                    <div className={styles.formWrapper}>
                        <ContactForm hasThanksLinks />
                    </div>
                </Container>
            </section>
            <Testimonials />
            <Map />
        </>
    );
};

export default ContactBlock;
