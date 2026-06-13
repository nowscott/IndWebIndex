import _ from 'lodash';
import TinyPinyin from 'tiny-pinyin';

// 随机排序
export const randomSort = arr => _.shuffle(arr);

// 去重
export const unique = arr => _.uniq(arr);

// 提取tag列表
export const extractTags = posts => {
  return _.chain(posts)
    .flatMap(post => post.tags)
    .uniq()
    .value();
};

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
    const name = post.name || '';
    const brief = post.brief || '';
    const tags = Array.isArray(post.tags) ? post.tags : [];
    const namePinyin = TinyPinyin.convertToPinyin(name);
    const nameInitials = getPinyinInitials(name);
    const tagsPinyin = tags.map(tag => TinyPinyin.convertToPinyin(tag || ''));
    const tagInitials = tags.map(tag => getPinyinInitials(tag || ''));

    return (
      name.toLowerCase().includes(lowerQuery) ||
      brief.toLowerCase().includes(lowerQuery) ||
      tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      namePinyin.toLowerCase().includes(lowerQuery) ||
      nameInitials.includes(lowerQuery) ||
      tagsPinyin.some(tagPinyin => tagPinyin.toLowerCase().includes(lowerQuery)) ||
      tagInitials.some(initials => initials.includes(lowerQuery))
    );
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
