import type { NextConfig } from 'next';
import { CLOUDINARY_HOST } from './src/app/lib/cloudinary-image';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    loader: 'custom',
    loaderFile: './src/app/lib/cloudinary-image.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: CLOUDINARY_HOST,
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
