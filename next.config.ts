import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    // Hardening for the Image Optimization API (see GHSA-2464-fhr4-w9xw and
    // GHSA-2xp9-vwfh-vxw4, fixed in next 16.4.3). These match Next.js defaults
    // and are set explicitly so they are not loosened by accident.
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  transpilePackages: ["marked"],
};

export default nextConfig;
