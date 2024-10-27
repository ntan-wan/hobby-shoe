/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@mikro-orm/migrations"],
    },

    images: {
        remotePatterns: [
            {
                //# For local development
                protocol: "https",
                hostname: "loremflickr.com",
            },
        ],
    },

    ignoreBuildErrors: true,
};

export default nextConfig;
