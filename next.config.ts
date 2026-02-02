import type { NextConfig } from "next";

import { withPayload } from "@payloadcms/next/withPayload";
import path from "path";

const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

const nextConfig: NextConfig = {
    eslint: {
        // Allow builds to succeed even if ESLint errors occur
        ignoreDuringBuilds: true,
    },
    images: {
        // Prefer AVIF, fallback to WebP for older browsers
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                hostname: "picsum.photos",
                pathname: "**",
                protocol: "https",
            },
            {
                // Cloudflare R2 storage
                hostname: "*.r2.cloudflarestorage.com",
                pathname: "**",
                protocol: "https",
            },
            {
                // If using a custom domain for R2
                hostname: "*.chalkandchino.com",
                pathname: "**",
                protocol: "https",
            },
            {
                // Cloudflare R2 custom domain for cached images
                hostname: "img.chalkandchino.co.uk",
                pathname: "**",
                protocol: "https",
            },
        ],
    },
    sassOptions: {
        includePaths: [path.resolve(__dirname, "src")],
        additionalData: `@use "@/app/(frontend)/_mixins.scss" as *;`,
        silenceDeprecations: ["legacy-js-api", "mixed-decls", "import"],
    },
    async rewrites() {
        return [
            {
                source: "/products/all",
                destination: "/products",
            },
        ];
    },
    async headers() {
        return [
            {
                // Cache static assets for 1 year
                source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                // Cache Next.js static files
                source: "/_next/static/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            "@": path.resolve(__dirname, "src"),
            "@/app": path.resolve(__dirname, "src/app"),
            "@/lib": path.resolve(__dirname, "src/lib"),
            "@/fields": path.resolve(__dirname, "src/fields"),
            "@/components": path.resolve(__dirname, "src/app/components"),
            "@/payload.config.js": path.resolve(
                __dirname,
                "src/payload.config.ts"
            ),
        };
        return config;
    },
};

// Skip Payload initialization in maintenance mode to avoid DB connection
export default isMaintenanceMode ? nextConfig : withPayload(nextConfig);
