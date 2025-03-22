import type { NextConfig } from "next";

import { withPayload } from "@payloadcms/next/withPayload";
import path from "path";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'picsum.photos',
                pathname: '**',
                protocol: 'https',
            },
        ]
    },
    sassOptions: {
        includePaths: [path.resolve(__dirname, 'src')],
        additionalData: `@import "@/app/(frontend)/_mixins.scss";`,
        silenceDeprecations: ["legacy-js-api"],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            '@': path.resolve(__dirname, 'src'),
            '@/payload.config.js': path.resolve(__dirname, 'src/payload.config.ts'),
        };
        return config;
    },
};

export default withPayload(nextConfig);
