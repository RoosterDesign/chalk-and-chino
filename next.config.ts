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
            '@': path.resolve(__dirname), // '@' now maps to the root of your project
        };
        return config;
    },
};

export default withPayload(nextConfig);
