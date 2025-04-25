import { getPayload } from 'payload'
import { serializeLexicalToPlaintext } from 'payload-lexical-richtext'

import configPromise from '../src/payload.config' // Adjust path if needed

const migrateDescriptions = async () => {
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
        collection: 'products',
        pagination: false,
    })

    for (const doc of docs) {
        const richText = doc.description

        if (typeof richText === 'object') {
            const plain = serializeLexicalToPlaintext(richText)

            await payload.update({
                collection: 'products',
                id: doc.id,
                data: {
                    description: plain,
                },
            })

            console.log(`✅ Updated product "${doc.name}"`)
        } else {
            console.log(`➡️ Skipped product "${doc.name}" (already plain text)`)
        }
    }

    console.log('🎉 Migration complete')
    process.exit(0)
}

migrateDescriptions().catch((err) => {
    console.error('❌ Migration failed:', err)
    process.exit(1)
})
