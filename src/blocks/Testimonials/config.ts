import sectionHeader from "@/fields/sectionHeader";
import { Block } from "payload";

const TestimonialsBlock: Block = {
    slug: "testimonials",
    interfaceName: "TestimonialsBlock",
    labels: {
        singular: "Testimonials",
        plural: "Testimonials",
    },
    fields: [
        sectionHeader,
        {
            name: "testimonials",
            label: "Select Testimonials or leave blank to randomly pick 3",
            type: "relationship",
            relationTo: "testimonials",
            hasMany: true,
            maxRows: 3,
            required: false,
        },
    ],
};

export default TestimonialsBlock;
