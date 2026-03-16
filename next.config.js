/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    DATABASE_ID: process.env.DATABASE_ID,
  },
  // Turbopack compatibility
  turbopack: {},
};

module.exports = nextConfig;