import { ProductType } from '@/app/lib/types';

import styles from './contact-form.module.scss';
import FormInput from './form-input/form-input';

type ContactFormProps = {
    product: ProductType;
};

const ContactForm: React.FC<ContactFormProps> = ({ product }) => {
    const { category, name, price, slug } = product;

    return (
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

                <input name="product-url" type="hidden" value={name} />
                <input name="product-name" type="hidden" value={`/products/${category}/${slug}`} />
                <input name="product-price" type="hidden" value={price} />

            </div>

            <button className="btn" type="submit">Send your enquiry</button>

        </form>
    )
}

export default ContactForm;
