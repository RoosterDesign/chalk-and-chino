// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { seoPlugin } from '@payloadcms/plugin-seo';
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from '@payloadcms/storage-s3';
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { ProductCategories } from "./collections/ProductCategories";
import { Products } from "./collections/Products";
import { Testimonials } from "./collections/Testimonials";
import { Users } from "./collections/Users";
import { AllProductsCategory } from "./globals/all-products-category";
import { Footer } from "./globals/footer";
import { Header } from "./globals/header";
import { Map } from "./globals/map";
import { PaymentDeliveryDetails } from "./globals/payment-delivery-details";
import { TestimonialsSettings } from "./globals/testimonialsSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    upload: {
        limits: {
            fileSize: 10 * 1024 * 1024, // 10MB
        },
    },
    admin: {
        importMap: {
            baseDir: path.resolve(dirname),
        },
        user: Users.slug,
        livePreview: {
            breakpoints: [
                {
                    label: "Mobile",
                    name: "mobile",
                    width: 375,
                    height: 667,
                },
                {
                    label: "Tablet",
                    name: "tablet",
                    width: 768,
                    height: 1024,
                },
                {
                    label: "Desktop",
                    name: "desktop",
                    width: 1440,
                    height: 900,
                },
            ],
        },
    },
    collections: [
        Users,
        Media,
        Pages,
        ProductCategories,
        Products,
        Testimonials,
    ],
    globals: [
        Header,
        Footer,
        AllProductsCategory,
        PaymentDeliveryDetails,
        Map,
        TestimonialsSettings,
    ],
    db: postgresAdapter({
        pool: {
            connectionString:
                process.env.DATABASE_ENV === 'local'
                    ? process.env.LOCAL_DATABASE_URL || ""
                    : process.env.NEON_DATABASE_URL || process.env.PAYLOAD_DATABASE_URL || "",
        },
        // Disable automatic schema push when using restored database
        push: false,
    }),
    editor: lexicalEditor(),
    plugins: [
        payloadCloudPlugin(),
        seoPlugin({
            collections: ['pages', 'product-categories', 'products'],
            uploadsCollection: 'media',
            // generateTitle:   ({ doc }) => doc.title,
            // generateDescription: ({ doc }) => doc.excerpt,
            generateImage:    () => '/og-default.png',
            fields: ({ defaultFields }) => defaultFields.filter(field => !('name' in field && field.name === 'image') ),
        }),
        s3Storage({
            collections: {
                media: {
                    generateFileURL: ({ filename }) => {
                        // Files are stored with chalk-and-chino/ prefix in R2
                        return `https://img.chalkandchino.co.uk/chalk-and-chino/${filename}`;
                    },
                }
            },
            bucket: process.env.S3_BUCKET || '',
            config: {
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.S3_SECRET || ''
                },
                region: 'auto',
                endpoint: process.env.S3_ENDPOINT || ''
            }
        })
    ],
    secret: process.env.PAYLOAD_SECRET || "",
    sharp,
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
});
