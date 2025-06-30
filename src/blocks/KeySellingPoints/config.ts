import { Block } from 'payload'

const KeySellingPointsBlock: Block = {
    slug: 'keySellingPoints',
    interfaceName: 'KeySellingPointsBlock',
    labels: {
        singular: 'Key Selling Points',
        plural: 'Key Selling Points',
    },
    fields: [
        {
            name: 'points',
            type: 'array',
            minRows: 4,
            maxRows: 4,
            required: true,
            label: 'Key Selling Points',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true
                },
                {
                    name: 'body',
                    type: 'textarea',
                    required: true
                }
            ]
        }
    ]
}

export default KeySellingPointsBlock;
