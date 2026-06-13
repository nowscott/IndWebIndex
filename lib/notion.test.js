import { beforeEach, describe, expect, it, vi } from 'vitest';
import { formatNotionPages, getDatabase } from './notion';

const validPage = {
  id: 'valid',
  properties: {
    empty: { formula: { string: 'ready' } },
    state: { select: { name: '正常' } },
    name: { title: [{ plain_text: '示例站点' }] },
    brief: { rich_text: [] },
    tags: { multi_select: [{ name: '工具' }] },
    web: { url: 'https://example.com' },
  },
};

beforeEach(() => {
  Object.assign(globalThis.notionCache, {
    data: null,
    lastFetched: null,
    databaseId: null,
    inFlight: null,
  });
  vi.restoreAllMocks();
});

describe('formatNotionPages', () => {
  it('formats valid rows and tolerates optional empty fields', () => {
    expect(formatNotionPages([validPage])).toEqual([
      {
        id: 'valid',
        name: '示例站点',
        state: '正常',
        brief: '',
        tags: ['工具'],
        web: 'https://example.com',
      },
    ]);
  });

  it('skips disconnected, empty, and invalid rows without failing the batch', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const disconnected = {
      ...validPage,
      id: 'disconnected',
      properties: {
        ...validPage.properties,
        state: { select: { name: '断开连接' } },
      },
    };
    const invalid = {
      id: 'invalid',
      properties: {
        name: { title: [] },
        web: { url: null },
      },
    };

    expect(formatNotionPages([disconnected, invalid, validPage])).toHaveLength(1);
  });
});

describe('getDatabase', () => {
  it('deduplicates concurrent refreshes in the same server process', async () => {
    const fetchPages = vi.fn(async () => [validPage]);

    const [first, second] = await Promise.all([
      getDatabase('database-a', fetchPages),
      getDatabase('database-a', fetchPages),
    ]);

    expect(fetchPages).toHaveBeenCalledTimes(1);
    expect(first).toEqual(second);
  });

  it('returns stale data when a refresh fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    const initial = await getDatabase('database-b', async () => [validPage]);
    globalThis.notionCache.lastFetched = 0;
    const stale = await getDatabase('database-b', async () => {
      throw new Error('temporary Notion failure');
    });

    expect(stale).toEqual(initial);
  });

  it('throws when no previous data is available', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(
      getDatabase('database-c', async () => {
        throw new Error('Notion unavailable');
      })
    ).rejects.toThrow('Notion unavailable');
  });
});
