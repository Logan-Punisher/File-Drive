/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: "successful-bobcat-164.convex.cloud",
        },
      ],
    },
  };

export default nextConfig;
