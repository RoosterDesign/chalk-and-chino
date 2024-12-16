import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['picsum.photos']
    },
    sassOptions: {
        silenceDeprecations: ["legacy-js-api"],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

export default nextConfig;
