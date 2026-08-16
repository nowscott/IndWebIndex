import { createClient } from '@libsql/client';

let turso;

export const getTursoClient = () => {
  if (turso) return turso;

  const url = process.env.TURSO_DATABASE_URL || process.env.indwebindex_TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN || process.env.indwebindex_TURSO_AUTH_TOKEN;
  if (!url || !authToken) return null;

  turso = createClient({ url, authToken });
  return turso;
};
