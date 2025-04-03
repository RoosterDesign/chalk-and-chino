import SectionHeader from '@/app/components/section-header/section-header';
import { ProductType } from '@/app/lib/types';
import Link from 'next/link';

import styles from './contact-form.module.scss';
import FormInput from './form-input/form-input';

type ContactFormProps = {
    hasHeader?: boolean;
    hasThanksLinks?: boolean;
    product?: ProductType;
    subtitle?: string;
    title?: string;
};

const ContactForm: React.FC<ContactFormProps> = ({ hasHeader, hasThanksLinks, product, subtitle, title }) => {

    // dummy logic
    const isSuccessful = false;

    return (
        <>
            {isSuccessful ?
                <div className={styles.thanks}>
                    <h2>Thank you for your enquiry.</h2>
                    <p>I will aim to respond to you ASAP.</p>
                    {hasThanksLinks &&
                        <p><Link href="/" title="Return to the homepage">Return to the homepage</Link> or <Link href="/products" title="View my available items">view my available items</Link>.</p>}
                </div>
                :
                <>
                    {hasHeader && <SectionHeader centered subtitle={subtitle} title={title} />}
                    <form className={styles.contactForm}>
                        <div className={styles.formFields}>
                            <FormInput label="Your name" name="name" placeholder="Please enter your name" required type="text" />
                            <div className={styles.contactFormCol}>
                                <FormInput label="Your phone number" name="phone" placeholder="Please enter phone number" type="text" />
                            </div>
                            <div className={styles.contactFormCol}>
                                <FormInput label="Your email address" name="email" placeholder="Please enter email address" required type="text" />
                            </div>
                            <FormInput label="Your enquiry" name="enquiry" placeholder="Please enter your name" required type="textarea" />
                            {product && <>
                                <input name="product-url" type="hidden" value={product.name} />
                                <input name="product-name" type="hidden" value={`/products/${product.category}/${product.slug}`} />
                                <input name="product-price" type="hidden" value={product.price} />
                            </>}
                        </div>
                        <button className="btn" type="submit">Send your enquiry</button>
                    </form>
                </>
            }
        </>
    )
}

export default ContactForm;
