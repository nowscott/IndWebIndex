module.exports = {
  output: 'export',  // 新增的静态导出配置
  env: {
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    DATABASE_ID: process.env.DATABASE_ID,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,  // 确保在浏览器环境中不使用Node.js的'fs'模块
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/_vercel/insights/script.js',
        destination: '/_vercel/insights/script.js',
      },
    ];
  },
};
