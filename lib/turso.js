import { createClient } from '@libsql/client';

// 兼容不同的环境变量命名（支持带有项目前缀或标准的命名）
const url = process.env.TURSO_DATABASE_URL || process.env.indwebindex_TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.indwebindex_TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  // 访问量功能是可选的，若缺失环境变量则静默退出
  if (process.env.NODE_ENV === 'development') {
    console.warn('Turso configuration missing. Visit count feature will be disabled.');
  }
}

export const turso = createClient({
  url: url || '',
  authToken: authToken || '',
});
