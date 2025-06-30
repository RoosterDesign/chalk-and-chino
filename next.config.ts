import type { NextConfig } from "next";

import { withPayload } from "@payloadcms/next/withPayload";
import path from "path";

const nextConfig: NextConfig = {
    eslint: {
        // Allow builds to succeed even if ESLint errors occur
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                hostname: "picsum.photos",
                pathname: "**",
                protocol: "https",
            },
        ],
    },
    sassOptions: {
        includePaths: [path.resolve(__dirname, "src")],
        additionalData: `@use "@/app/(frontend)/_mixins.scss" as *;`,
        silenceDeprecations: ["legacy-js-api", "mixed-decls"],
    },
    async rewrites() {
        return [
            {
                source: "/products/all",
                destination: "/products",
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

export default withPayload(nextConfig);
