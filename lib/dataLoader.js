import shuffle from 'lodash/shuffle';
import TinyPinyin from 'tiny-pinyin';

// 随机排序
export const randomSort = shuffle;

// 提取tag列表
export const extractTags = posts => {
  return [...new Set(posts.flatMap(post => post.tags || []))];
};

const buildSearchIndex = post => {
  const name = post.name || '';
  const brief = post.brief || '';
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const namePinyin = TinyPinyin.convertToPinyin(name);
  const nameInitials = getPinyinInitials(name);
  const tagsPinyin = tags.map(tag => TinyPinyin.convertToPinyin(tag || ''));
  const tagInitials = tags.map(tag => getPinyinInitials(tag || ''));

  return [
    name,
    brief,
    ...tags,
    namePinyin,
    nameInitials,
    ...tagsPinyin,
    ...tagInitials,
  ].join('\u0000').toLowerCase();
};

export const preparePostsForSearch = posts => posts.map(post => ({
  ...post,
  searchIndex: buildSearchIndex(post),
}));

// 通过搜索筛选
export const filterPostsBySearch = (posts, query) => {
  if (!query) {
    return posts.filter(post => post.state !== '隐藏');
  }

  const lowerQuery = query.trim().toLowerCase();

  // 特殊指令：只显示隐藏的网页
  if (lowerQuery === '隐藏' || lowerQuery === 'yincang') {
    return posts.filter(post => post.state === '隐藏');
  }
  
  const visiblePosts = posts.filter(post => post.state !== '隐藏');

  return visiblePosts.filter(post => {
    return (post.searchIndex || buildSearchIndex(post)).includes(lowerQuery);
  });
};

export const getPinyinInitials = text => {
  return Array.from(text || '')
    .filter(character => character.trim())
    .map(character => TinyPinyin.convertToPinyin(character).charAt(0))
    .join('')
    .toLowerCase();
};

// 更新结果
export const updateResults = (posts, onList) => {
  return posts.filter(post => 
    onList.every(tag => post.tags.includes(tag))
  );
};
