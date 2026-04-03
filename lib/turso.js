import { createClient } from '@libsql/client';

// 兼容不同的环境变量命名（支持带有项目前缀或标准的命名）
const url = process.env.TURSO_DATABASE_URL || process.env.indwebindex_TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.indwebindex_TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error('Turso configuration missing. Please check TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in environment variables.');
}

export const turso = createClient({
  url: url || '',
  authToken: authToken || '',
});
