




import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['76.13.183.180'],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      // Exact hosts in use — no wildcard. Cloudinary serves marketing/treatment
      // images; the S3 bucket serves seeded news photos; filesafe.space serves
      // legacy service/provider images.
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "waldoughmediaclients.s3.us-east-2.amazonaws.com" },
      { protocol: "https", hostname: "assets.cdn.filesafe.space" },
      { protocol: "https", hostname: "www.agemanagementmed.com" },
      // Placeholder photos used by unfinished /specials content (src/content/pages/specials.ts) — swap for real Cloudinary assets and remove this entry.
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  output:"standalone"
};

export default nextConfig;
