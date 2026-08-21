// scripts/regenerateMedia.ts
//
// Re-uploads every media doc so Payload regenerates its image sizes against
// the current Media config. Run after changing `imageSizes` in
// src/collections/Media.ts - existing docs keep their old derivatives until
// they are rebuilt.
//
// Note: files are written to whichever S3/R2 bucket S3_BUCKET points at, which
// is shared with production unless you override it.
import "dotenv/config";
import { getPayload } from "payload";

import config from "../src/payload.config";

// The bucket is shared with the live site, so keep the pressure modest.
const CONCURRENCY = 4;
const PAGE_SIZE = 50;

const redact = (url = "") => url.replace(/\/\/[^@]+@/, "//<redacted>@");

const regenerate = async () => {
    const payload = await getPayload({ config });

    console.log(
        `Database : ${redact(
            process.env.DATABASE_ENV === "local"
                ? process.env.LOCAL_DATABASE_URL
                : process.env.NEON_DATABASE_URL
        )}`
    );
    console.log(`Bucket   : ${process.env.S3_BUCKET}\n`);

    const failures: string[] = [];
    let regenerated = 0;
    let page = 1;
    let totalPages = 1;

    do {
        const result = await payload.find({
            collection: "media",
            depth: 0,
            limit: PAGE_SIZE,
            page,
            sort: "id",
        });

        totalPages = result.totalPages;

        for (let i = 0; i < result.docs.length; i += CONCURRENCY) {
            const batch = result.docs.slice(i, i + CONCURRENCY);

            await Promise.all(
                batch.map(async (doc) => {
                    if (!doc.url || !doc.filename) {
                        failures.push(`${doc.id}: missing url or filename`);
                        return;
                    }

                    try {
                        const response = await fetch(doc.url);
                        if (!response.ok) {
                            throw new Error(`fetch returned ${response.status}`);
                        }
                        const data = Buffer.from(await response.arrayBuffer());

                        await payload.update({
                            collection: "media",
                            data: { alt: doc.alt },
                            file: {
                                data,
                                mimetype: doc.mimeType ?? "image/webp",
                                name: doc.filename,
                                size: data.byteLength,
                            },
                            id: doc.id,
                            overwriteExistingFiles: true,
                            // The focal point has to travel via req.query. Sending it in
                            // `data` unchanged makes Payload return undefined upload edits,
                            // which throws once a file is attached.
                            req: {
                                query: {
                                    uploadEdits: {
                                        focalPoint: {
                                            x: doc.focalX ?? 50,
                                            y: doc.focalY ?? 50,
                                        },
                                    },
                                },
                            },
                        });

                        regenerated += 1;
                        console.log(`  ok      ${doc.filename}`);
                    } catch (error) {
                        const message = (error as Error).message;
                        failures.push(`${doc.filename}: ${message}`);
                        console.error(`  FAILED  ${doc.filename}: ${message}`);
                    }
                })
            );
        }

        page += 1;
    } while (page <= totalPages);

    console.log(`\nRegenerated ${regenerated}, failed ${failures.length}`);
    failures.forEach((failure) => console.error(` - ${failure}`));

    process.exit(failures.length > 0 ? 1 : 0);
};

regenerate().catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
});
