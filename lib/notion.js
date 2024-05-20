import { Client } from '@notionhq/client';

// 创建 Notion 客户端实例，使用环境变量中的 NOTION_TOKEN 进行身份验证
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// 获取指定数据库的所有页面
export const getAllPages = async (databaseId) => {
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

// 获取指定数据库的页面并转换为适合显示的格式
export const getDatabase = async (databaseId) => {
  // 获取指定数据库的所有页面
  const pages = await getAllPages(databaseId);
  // 将页面格式化为适合显示的格式
  return pages
    .filter(page => page.properties.empty.formula.string !== 'empty') // 过滤掉空的页面
    .filter(page => page.properties.state.select.name !== '断开连接') // 过滤掉状态为 "断开连接" 的页面
    .map(page => {
      const properties = page.properties;
      return {
        id: page.id, // 页面的 ID
        name: properties.name.title[0].plain_text, // 页面的名称
        state: properties.state.select.name, // 页面的状态
        brief: properties.brief.rich_text[0].plain_text, // 页面的简介
        tags: properties.tags.multi_select.map(tag => tag.name), // 页面的标签数组
        web: properties.web.url, // 页面的网址
      };
    });
};