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
			{
				protocol: "https",
				hostname: "res.cloudinary.com"
			}
        ],
    },

    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
