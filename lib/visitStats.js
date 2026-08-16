import { turso } from './turso';
import { buildVisitActivity, getShanghaiDate } from './visitActivity';

const PAGE_VIEW_COUNT_ID = 'page_view_count';
const ACTIVITY_STARTED_AT_ID = 'activity_started_at';

export const isVisitTrackingEnabled = () => Boolean(
  (process.env.TURSO_DATABASE_URL || process.env.indwebindex_TURSO_DATABASE_URL)
  && (process.env.TURSO_AUTH_TOKEN || process.env.indwebindex_TURSO_AUTH_TOKEN)
);

const setupTables = async () => {
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS stats (
      id TEXT PRIMARY KEY,
      count INTEGER DEFAULT 0
    )
  `);
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS page_view_activity (
      visit_date TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0
    )
  `);
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS visit_activity_meta (
      id TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);
  await turso.execute({
    sql: 'INSERT OR IGNORE INTO stats (id, count) VALUES (?, ?)',
    args: [PAGE_VIEW_COUNT_ID, 0],
  });
};

export const getVisitActivitySnapshot = async () => {
  if (!isVisitTrackingEnabled()) return null;

  await setupTables();
  const [countResult, startedAtResult] = await Promise.all([
    turso.execute({ sql: 'SELECT count FROM stats WHERE id = ?', args: [PAGE_VIEW_COUNT_ID] }),
    turso.execute({ sql: 'SELECT value FROM visit_activity_meta WHERE id = ?', args: [ACTIVITY_STARTED_AT_ID] }),
  ]);
  const startedAt = startedAtResult.rows[0]?.value || null;
  const snapshotDate = getShanghaiDate();
  const dailyResult = await turso.execute({
    sql: 'SELECT visit_date, count FROM page_view_activity WHERE visit_date >= ?',
    args: [startedAt || snapshotDate],
  });

  return {
    count: Number(countResult.rows[0]?.count || 0),
    snapshotDate,
    activity: buildVisitActivity({
      endDate: snapshotDate,
      startedAt,
      dailyCounts: dailyResult.rows.map(row => ({ date: row.visit_date, count: row.count })),
    }),
  };
};

export const recordPageView = async () => {
  if (!isVisitTrackingEnabled()) return false;

  await setupTables();
  const today = getShanghaiDate();
  const transaction = await turso.transaction('write');

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
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
