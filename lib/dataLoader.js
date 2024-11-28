import _ from 'lodash';
import TinyPinyin from 'tiny-pinyin';

// 随机排序
export const randomSort = arr => _.shuffle(arr);

// 去重
export const unique = arr => _.uniq(arr);

// 提取tag列表
export const extractTags = posts => {
  return _.chain(posts)
    .filter(post => post.state !== '隐藏')
    .flatMap(post => post.tags)
    .uniq()
    .value();
};

// 通过tags筛选
export const filterPostsByTags = (posts, tags) => {
  return posts.filter(post => tags.every(tag => post.tags.includes(tag)));
};

// 通过搜索筛选
export const filterPostsBySearch = (posts, query) => {
  if (query === '隐藏') {
    return posts;
  }
  const lowerQuery = query.toLowerCase();
  return posts.filter(post => {
    const namePinyin = TinyPinyin.convertToPinyin(post.name || '');
    const tagsPinyin = post.tags.map(tag => TinyPinyin.convertToPinyin(tag || ''));

    return (
      post.name.toLowerCase().includes(lowerQuery) ||
      post.brief.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      namePinyin.toLowerCase().includes(lowerQuery) ||
      tagsPinyin.some(tagPinyin => tagPinyin.toLowerCase().includes(lowerQuery))
    );
  });
};

// 渲染标签
export const renderTags = (tags, onList, toggleTagButton) => {
  return tags.map((tag, index) => (
    <button
      key={index}
      id={`tag${index}`}
      className={onList.includes(tag) ? 'tag on' : 'tag off'}
      onClick={() => toggleTagButton(tag)}
    >
      {tag}
    </button>
  ));
};

// 切换标签按钮
export const toggleTagButton = (tag, onList, setOnList, tags, setTags) => {
  const newOnList = _.xor(onList, [tag]);
  setOnList(newOnList);
  const sortedTags = newOnList.concat(tags.filter(t => !newOnList.includes(t)));
  setTags(sortedTags);
};

// 更新结果
export const updateResults = (posts, onList, setFilteredPosts, setTags) => {
  const filtered = posts.filter(post => 
    onList.every(tag => post.tags.includes(tag))
  );
  setFilteredPosts(filtered);
  const availableTags = _.uniq(_.flatMap(filtered, 'tags'));
  const sortedTags = onList.concat(availableTags.filter(tag => !onList.includes(tag)));
  setTags(sortedTags);
};