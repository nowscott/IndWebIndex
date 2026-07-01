import { Client } from '@notionhq/client';

// Persist cache across hot reloads and warm serverless invocations.
const globalCache = globalThis.notionCache || {
  data: null,
  lastFetched: null,
  databaseId: null,
  inFlight: null,
};

globalThis.notionCache = globalCache;

const CACHE_TTL = 30 * 60 * 1000; // 缓存 30 分钟

// 创建 Notion 客户端实例，使用环境变量中的 NOTION_TOKEN 进行身份验证
const getNotionClient = () => {
  if (!process.env.NOTION_TOKEN) {
    throw new Error('NOTION_TOKEN is missing');
  }

  return new Client({ auth: process.env.NOTION_TOKEN });
};

// 获取指定数据库的所有页面
export const getAllPages = async (databaseId) => {
  if (!databaseId) {
    throw new Error('DATABASE_ID is missing');
  }

  const notion = getNotionClient();
  let results = []; // 存储所有页面的数组
  let hasMore = true; // 用于迭代查询，检查是否还有更多页面需要获取
  let startCursor = undefined; // 用于获取下一页的游标

  // 当仍有更多页面需要获取时循环执行
  while (hasMore) {
    // 查询数据库的一页数据
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor,
    });

    // 将当前页的结果追加到结果数组中
    results = results.concat(response.results);
    // 更新是否还有更多页面的标志
    hasMore = response.has_more;
    // 更新下一页的游标，以便下次查询时获取下一页数据
    startCursor = response.next_cursor;
  }

  return results; // 返回所有页面的数组
};

const getPlainText = values => {
  if (!Array.isArray(values)) return '';
  return values.map(value => value?.plain_text || '').join('').trim();
};

export const formatNotionPages = pages => {
  if (!Array.isArray(pages)) return [];

  return pages.flatMap(page => {
    const properties = page?.properties || {};
    const emptyMarker = properties.empty?.formula?.string;
    const state = properties.state?.select?.name || '';

    if (emptyMarker === 'empty' || state === '断开连接') {
      return [];
    }

    const name = getPlainText(properties.name?.title);
    const web = properties.web?.url?.trim();

    // A broken row should not prevent every valid bookmark from rendering.
    if (!name || !web) {
      console.warn(`Skipping invalid Notion page: ${page?.id || 'unknown'}`);
      return [];
    }

    return [{
      id: page.id,
      name,
      state,
      brief: getPlainText(properties.brief?.rich_text),
      tags: Array.isArray(properties.tags?.multi_select)
        ? properties.tags.multi_select.map(tag => tag?.name).filter(Boolean)
        : [],
      web,
    }];
  });
};

// 获取指定数据库的页面并转换为适合显示的格式
export const getDatabase = async (databaseId, fetchPages = getAllPages) => {
  if (process.env.SKIP_NOTION_FETCH === '1') {
    return [];
  }

  if (!databaseId) {
    throw new Error('DATABASE_ID is missing');
  }

  const now = Date.now();

  // 如果缓存存在且未过期，直接返回缓存数据
  if (
    globalCache.databaseId === databaseId &&
    globalCache.data !== null &&
    globalCache.lastFetched &&
    now - globalCache.lastFetched < CACHE_TTL
  ) {
    console.log('Using Notion database cache...');
    return globalCache.data;
  }

  if (globalCache.inFlight?.databaseId === databaseId) {
    return globalCache.inFlight.promise;
  }

  const request = (async () => {
    try {
      console.log('Fetching fresh data from Notion...');
      const pages = await fetchPages(databaseId);
      const formattedData = formatNotionPages(pages);

      globalCache.data = formattedData;
      globalCache.lastFetched = Date.now();
      globalCache.databaseId = databaseId;

      return formattedData;
    } catch (error) {
      console.error('Error fetching pages from Notion:', error);

      if (globalCache.databaseId === databaseId && globalCache.data !== null) {
        console.warn('Using stale Notion database cache after refresh failure.');
        return globalCache.data;
      }

      // Throwing lets ISR retain the previously generated page instead of
      // publishing an empty result for a temporary upstream failure.
      throw error;
    } finally {
      if (globalCache.inFlight?.promise === request) {
        globalCache.inFlight = null;
      }
    }
  })();

  globalCache.inFlight = { databaseId, promise: request };
  return request;
};
