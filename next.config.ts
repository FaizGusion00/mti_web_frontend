import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://panel.metatravel.ai/api/:path*', // Proxy to the production API
      },
    ];
  },
};

export default nextConfig;
