import { turso } from '../../lib/turso';
import { buildVisitActivity, getShanghaiDate } from '../../lib/visitActivity';

const PAGE_VIEW_COUNT_ID = 'page_view_count';
const ACTIVITY_STARTED_AT_ID = 'activity_started_at';

const getRequestOrigin = req => {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || (process.env.NODE_ENV === 'production' ? 'https' : 'http');
  return host ? `${String(protocol).split(',')[0]}://${String(host).split(',')[0]}` : null;
};

const setupTables = async client => {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS stats (
      id TEXT PRIMARY KEY,
      count INTEGER DEFAULT 0
    )
  `);
  await client.execute(`
    CREATE TABLE IF NOT EXISTS page_view_activity (
      visit_date TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0
    )
  `);
  await client.execute(`
    CREATE TABLE IF NOT EXISTS visit_activity_meta (
      id TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);
  await client.execute({
    sql: 'INSERT OR IGNORE INTO stats (id, count) VALUES (?, ?)',
    args: [PAGE_VIEW_COUNT_ID, 0],
  });
};

const getActivityPayload = async client => {
  const [countResult, startedAtResult] = await Promise.all([
    client.execute({ sql: 'SELECT count FROM stats WHERE id = ?', args: [PAGE_VIEW_COUNT_ID] }),
    client.execute({ sql: 'SELECT value FROM visit_activity_meta WHERE id = ?', args: [ACTIVITY_STARTED_AT_ID] }),
  ]);
  const startedAt = startedAtResult.rows[0]?.value || null;
  const today = getShanghaiDate();
  const dailyResult = await client.execute({
    sql: 'SELECT visit_date, count FROM page_view_activity WHERE visit_date >= ?',
    args: [startedAt || today],
  });

  return {
    count: Number(countResult.rows[0]?.count || 0),
    startedAt,
    activity: buildVisitActivity({
      endDate: today,
      startedAt,
      dailyCounts: dailyResult.rows.map(row => ({ date: row.visit_date, count: row.count })),
    }),
  };
};

const recordPageView = async client => {
  const today = getShanghaiDate();
  const transaction = await client.transaction('write');

  try {
    await transaction.execute({
      sql: 'INSERT OR IGNORE INTO visit_activity_meta (id, value) VALUES (?, ?)',
      args: [ACTIVITY_STARTED_AT_ID, today],
    });
    await transaction.execute({
      sql: `
        INSERT INTO page_view_activity (visit_date, count) VALUES (?, 1)
        ON CONFLICT(visit_date) DO UPDATE SET count = count + 1
      `,
      args: [today],
    });
    await transaction.execute({
      sql: 'UPDATE stats SET count = count + 1 WHERE id = ?',
      args: [PAGE_VIEW_COUNT_ID],
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!process.env.TURSO_DATABASE_URL && !process.env.indwebindex_TURSO_DATABASE_URL) {
    return res.status(200).json({ enabled: false, message: 'Turso database URL missing' });
  }
  if (!process.env.TURSO_AUTH_TOKEN && !process.env.indwebindex_TURSO_AUTH_TOKEN) {
    return res.status(200).json({ enabled: false, message: 'Turso auth token missing' });
  }
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  if (req.method === 'POST') {
    const expectedOrigin = getRequestOrigin(req);
    if (!req.headers.origin || req.headers.origin !== expectedOrigin) {
      return res.status(403).json({ error: 'Invalid request origin' });
    }
  }

  try {
    await setupTables(turso);
    if (req.method === 'POST') await recordPageView(turso);
    return res.status(200).json({ enabled: true, ...(await getActivityPayload(turso)) });
  } catch (error) {
    console.error('[API] Visit activity error:', error);
    return res.status(200).json({
      enabled: false,
      count: 0,
      error: 'Database operation failed',
      detail: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
