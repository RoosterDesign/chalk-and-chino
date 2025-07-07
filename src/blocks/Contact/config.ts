import { Block } from "payload";

const Contact: Block = {
    slug: "contact",
    interfaceName: "ContactBlock",
    fields: [
        {
            name: "heading",
            label: "Contact Page Title",
            type: "text",
            required: true,
        },
        {
            name: "introText",
            label: "Contact Page Intro Text",
            type: "textarea",
            required: true,
        },
    ],
};

export default Contact;
