import { Media } from "@/collections/Media";
import { Pages } from "@/collections/Pages";
import { Users } from "@/collections/Users";
// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        importMap: {
            baseDir: path.resolve(dirname),
        },
        user: Users.slug,
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
