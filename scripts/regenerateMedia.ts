// scripts/regenerateMedia.ts
import "dotenv/config"
import payload from "payload"
import fetch from "node-fetch"      // or undici
import configPromise from "../src/payload.config"

// Helper to turn a ReadableStream into a Buffer
async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  const chunks: Buffer[] = []
  for await (const chunk of stream) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

async function regenerate() {
  const { PAYLOAD_SECRET, PAYLOAD_DATABASE_URL } = process.env
  if (!PAYLOAD_SECRET || !PAYLOAD_DATABASE_URL) {
    console.error("✖ Please set PAYLOAD_SECRET and PAYLOAD_DATABASE_URL in .env")
    process.exit(1)
  }

  const config = await configPromise

  // Initialize Payload with your local TS config
  await payload.init({
    secret:      PAYLOAD_SECRET,
    databaseURL: PAYLOAD_DATABASE_URL,
    local:       true,
    config,
  })

  // Fetch all media entries
  const { docs } = await payload.find({
    collection: "media",
    depth:      0,
    limit:      500,
  })

  await Promise.all(
    docs.map(async (doc) => {
      if (!doc.url) {
        console.warn(`⚠️  Skipping ${doc.filename}: no public URL`)
        return
      }
      try {
        // Download via HTTP
        const res = await fetch(doc.url)
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
        const buffer = await streamToBuffer(res.body as any)

        // Re-upload buffer to regenerate all imageSizes
        await payload.update({
          collection: "media",
          id:         doc.id,
          data:       doc, // preserve alt, etc.
          file: {
            buffer,
            filename: doc.filename,
            mimetype: doc.mimeType || undefined,
          },
          overwriteExistingFiles: true,
        })

        console.log(`✅ Regenerated ${doc.filename}`)
      } catch (err) {
        console.error(`❌ Failed to regenerate ${doc.filename}`, err)
      }
    })
  )

  console.log("🎉 All done!")
  process.exit(0)
}

regenerate().catch((err) => {
  console.error("Unexpected error:", err)
  process.exit(1)
})
