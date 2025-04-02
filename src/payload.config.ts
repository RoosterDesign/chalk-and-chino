// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        importMap: {
            baseDir: path.resolve(dirname),
        },
        user: Users.slug,
        livePreview: {
            url: 'http://localhost:3000',
            collections: ['pages'],
            disableLivePreviewAccessControl: true,
            breakpoints: [
                {
                    label: 'Mobile',
                    name: 'mobile',
                    width: 375,
                    height: 667,
                },
                {
                    label: 'Tablet',
                    name: 'tablet',
                    width: 768,
                    height: 1024,
                },
                {
                    label: 'Desktop',
                    name: 'desktop',
                    width: 1440,
                    height: 900,
                },
            ],
        },
    },
    collections: [Users, Media, Pages],
    db: postgresAdapter({
        pool: {
            connectionString: process.env.PAYLOAD_DATABASE_URL || "",
        },
    }),
    editor: lexicalEditor(),
    plugins: [
        payloadCloudPlugin(),
        // storage-adapter-placeholder
    ],
    secret: process.env.PAYLOAD_SECRET || "",
    sharp,
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
});
