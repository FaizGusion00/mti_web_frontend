import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during builds to avoid deployment issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configure for server deployment
  distDir: '.next',
  
  // Enable image optimization for server deployment
  images: {
    domains: ['register.metatravel.ai'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'register.metatravel.ai',
      },
    ],
  },
};

export default nextConfig;
