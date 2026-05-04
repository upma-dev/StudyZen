import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Optimize memory usage during compilation
  experimental: {
    // Optimize package scanning to reduce memory
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-slot',
      'react-hook-form',
    ],
    // Turbopack-specific optimizations
    turbo: {
      // Enable resolve extensions for Turbopack
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
  },
};

export default nextConfig;
