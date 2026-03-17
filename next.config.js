/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    DATABASE_ID: process.env.DATABASE_ID,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  experimental: {
    // 允许局域网 IP 访问，避免 Next.js 警告
    allowedDevOrigins: ['localhost:3000', '192.168.31.231:3000'],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;