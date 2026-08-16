import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getShanghaiDate } from './visitActivity';

const database = vi.hoisted(() => {
  const state = { stats: new Map(), meta: new Map(), daily: new Map() };
  const execute = async query => {
    if (typeof query === 'string') return { rows: [] };
    const sql = query.sql.replace(/\s+/g, ' ').trim();
    const [first, second] = query.args || [];

    if (sql.startsWith('INSERT OR IGNORE INTO stats')) {
      if (!state.stats.has(first)) state.stats.set(first, Number(second));
    } else if (sql.startsWith('INSERT OR IGNORE INTO visit_activity_meta')) {
      if (!state.meta.has(first)) state.meta.set(first, second);
    } else if (sql.startsWith('INSERT INTO page_view_activity')) {
      state.daily.set(first, (state.daily.get(first) || 0) + 1);
    } else if (sql.startsWith('UPDATE stats SET count = count + 1')) {
      state.stats.set(first, (state.stats.get(first) || 0) + 1);
    } else if (sql.startsWith('SELECT count FROM stats')) {
      return { rows: [{ count: state.stats.get(first) || 0 }] };
    } else if (sql.startsWith('SELECT value FROM visit_activity_meta')) {
      return { rows: state.meta.has(first) ? [{ value: state.meta.get(first) }] : [] };
    } else if (sql.startsWith('SELECT visit_date, count FROM page_view_activity')) {
      return {
        rows: [...state.daily]
          .filter(([date]) => date >= first)
          .map(([visit_date, count]) => ({ visit_date, count })),
      };
    }
    return { rows: [] };
  };

  return {
    state,
    turso: {
      execute: vi.fn(execute),
      transaction: vi.fn(async () => ({ execute, commit: vi.fn(), rollback: vi.fn() })),
    },
  };
});

vi.mock('./turso', () => ({ getTursoClient: () => database.turso }));

import handler from '../pages/api/visit-count';
import { getVisitActivitySnapshot } from './visitStats';

const createResponse = () => ({
  statusCode: null,
  body: null,
  setHeader: vi.fn(),
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(body) {
    this.body = body;
    return body;
  },
  end: vi.fn(),
});

const postRequest = {
  method: 'POST',
  headers: { host: 'example.test', origin: 'http://example.test' },
};

beforeEach(() => {
  database.state.stats.clear();
  database.state.meta.clear();
  database.state.daily.clear();
  database.turso.execute.mockClear();
  database.turso.transaction.mockClear();
  process.env.TURSO_DATABASE_URL = 'libsql://example.turso.io';
  process.env.TURSO_AUTH_TOKEN = 'test-token';
});

describe('visit count API', () => {
  it('records background page views and exposes them to the build snapshot', async () => {
    const first = createResponse();
    await handler(postRequest, first);
    const second = createResponse();
    await handler(postRequest, second);
    const snapshot = await getVisitActivitySnapshot();

    const today = getShanghaiDate();
    expect(first.statusCode).toBe(204);
    expect(second.statusCode).toBe(204);
    expect(snapshot.count).toBe(2);
    expect(snapshot.activity.find(day => day.date === today)).toEqual({
      date: today,
      count: 2,
      estimated: false,
    });
  });

  it('silently skips storage when Turso is not configured', async () => {
    delete process.env.TURSO_DATABASE_URL;
    delete process.env.TURSO_AUTH_TOKEN;
    const response = createResponse();

    await handler(postRequest, response);

    expect(response.statusCode).toBe(204);
    expect(database.state.daily.size).toBe(0);
  });
});
