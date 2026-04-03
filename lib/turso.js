import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error('Turso configuration missing. Please check TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in environment variables.');
}

export const turso = createClient({
  url: url || '',
  authToken: authToken || '',
});
