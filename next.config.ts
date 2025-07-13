import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for static hosting
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Disable ESLint during builds to avoid deployment issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configure asset prefix for proper static file serving
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Remove the API rewrites for static export
  // Static exports don't support API routes or rewrites
  
  // Configure for static hosting
  distDir: '.next',
  
  // Ensure proper handling of static assets
  experimental: {
    // Enable static exports
    
  },
};

export default nextConfig;
