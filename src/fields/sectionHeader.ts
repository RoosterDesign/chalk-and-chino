import { Field } from "payload";

const sectionHeader: Field = {
    name: "sectionHeader",
    type: "group",
    fields: [
        {
            name: "centered",
            label: "Center Text",
            type: "checkbox",
            defaultValue: false,
        },
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "synopsis",
            type: "textarea",
            required: false,
        },
        {
            name: "link",
            label: "View All Link",
            type: "group",
            fields: [
                {
                    name: "label",
                    type: "text",
                    defaultValue: "View all",
                    required: false,
                },
                {
                    name: "url",
                    type: "text",
                    defaultValue: "/products",
                    required: false,
                },
            ],
        },
    ],
};

export default sectionHeader;
