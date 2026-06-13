/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  experimental: {
    // 允许局域网 IP 访问，避免 Next.js 警告
    serverActions: {
      allowedOrigins: ['localhost:3000', '192.168.31.231:3000'],
    },
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
