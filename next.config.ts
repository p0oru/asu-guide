import type { NextConfig } from "next";
import packageJson from './package.json';

const nextConfig: NextConfig = {
  // Expose package version to client
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
  // Image optimization for external sources (food/deal images)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
