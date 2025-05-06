import { Block } from 'payload'

const CategoryGridBlock: Block = {
    slug: 'categoryGrid',
    labels: {
        singular: 'Category Grid',
        plural: 'Category Grids',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'Browse by Category',
            required: true
        },
    ]
}

export default CategoryGridBlock;
