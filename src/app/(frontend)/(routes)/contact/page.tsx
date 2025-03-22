import ContactForm from '@/components/contact-form/contact-form';
import Container from '@/components/container/container';
import Map from '@/components/map/map';
import Testimonials from '@/components/testimonials/testimonials';

import styles from './styles.module.scss';

const Contact: React.FC = () => {

    return (
        <>
            <section className={styles.contact}>
                <Container>

                    <h1>Get in touch</h1>
                    <p>Etiam egestas, nunc sed laoreet tristique, neque sapien commodo tellus, in consequat ante urna a felis maecenas vel urna risus lorem ipsum dolor.</p>

                    <div className={styles.formWrapper}>
                        <ContactForm hasThanksLinks />
                    </div>

                </Container>

            </section>
            <Testimonials />
            <Map />
        </>
    )
}

export default Contact;
