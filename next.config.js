/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    // Server-side environment variables
    PROMETORA_API_URL: process.env.PROMETORA_API_URL || 'https://www.prometora.com',
    STORE_ID: process.env.STORE_ID || '690b76ac2be3b8608147f593',
    STORE_SLUG: process.env.STORE_SLUG || 'suuqfuran',
    // Client-side environment variables (must start with NEXT_PUBLIC_)
    NEXT_PUBLIC_PROMETORA_URL: process.env.NEXT_PUBLIC_PROMETORA_URL || 'https://www.prometora.com',
    NEXT_PUBLIC_STORE_SLUG: process.env.NEXT_PUBLIC_STORE_SLUG || 'suuqfuran',
  },
};

module.exports = nextConfig;
