import { RichText } from "@payloadcms/richtext-lexical/react";

import type { WysiwygBlock as WysiwygBlockProps } from "@/payload-types";

import Container from "@/app/components/container/container";

import styles from "./styles.module.scss";

const WysiwygBlock: React.FC<WysiwygBlockProps> = ({ title, body }) => {
    return (
        <section>
            <Container>
                <div className={styles.wysiwyg}>
                    {title && <h1>{title}</h1>}
                    {body && <RichText data={body} />}
                </div>
            </Container>
        </section>
    );
};

export default WysiwygBlock;
