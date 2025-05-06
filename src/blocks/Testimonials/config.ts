import sectionHeader from '@/fields/sectionHeader'
import { Block } from 'payload'

const TestimonialsBlock: Block = {
    slug: 'testimonials',
    interfaceName: 'TestimonialsBlock',
    labels: {
        singular: 'Testimonials',
        plural: 'Testimonials',
    },
    fields: [
        sectionHeader,
        {
            name: 'testimonials',
            type: 'relationship',
            relationTo: 'testimonials',
            hasMany: true,
            maxRows: 3,
            required: true
        },
    ]
}

export default TestimonialsBlock
