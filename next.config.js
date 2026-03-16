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