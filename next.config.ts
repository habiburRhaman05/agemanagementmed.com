




import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['76.13.183.180'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  output:"standalone"
};

export default nextConfig;
