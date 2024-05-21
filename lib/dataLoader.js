// 随机排序
export const randomSort = arr => {
  for (let i = 0, l = arr.length; i < l; i++) {
    let rc = parseInt(Math.random() * l);
    const empty = arr[i];
    arr[i] = arr[rc];
    arr[rc] = empty;
  }
  return arr;
};
// 去重
export const unique = arr => Array.from(new Set(arr));

//提取tag列表
export const extractTags = posts => {
  const allTags = new Set();
  posts.forEach(post => {
    if (post.state !== '隐藏') {
      post.tags.forEach(tag => allTags.add(tag));
    }
  });
  return [...allTags];
};


// 通过tags筛选
export const filterPostsByTags = (posts, tags) => {
  return posts.filter(post => tags.every(tag => post.tags.includes(tag)));
};

//通过搜索筛选
export const filterPostsBySearch = (posts, query) => {
  if(query === '隐藏'){
    return posts
  }
  // 返回符合查询条件的帖子
  return posts.filter(post =>
    post.name.toLowerCase().includes(query.toLowerCase()) ||
    post.brief.toLowerCase().includes(query.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};


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

export const toggleTagButton = (tag, onList, setOnList, tags, setTags) => {
  let newOnList;
  if (onList.includes(tag)) {
      newOnList = onList.filter(item => item !== tag);
  } else {
      newOnList = [...onList, tag];
  }
  setOnList(newOnList);
  // 重新排序标签列表，使选中的标签排在前面
  const sortedTags = newOnList.concat(tags.filter(t => !newOnList.includes(t)));
  setTags(sortedTags);
};

export const updateResults = (posts, onList, setFilteredPosts, setTags) => {
  const filtered = posts.filter(post => 
      onList.every(tag => post.tags.includes(tag))
  );
  setFilteredPosts(filtered);
  // 更新标签列表，只显示可选的标签
  const availableTags = Array.from(new Set(filtered.flatMap(post => post.tags)));
  const sortedTags = onList.concat(availableTags.filter(tag => !onList.includes(tag)));
  setTags(sortedTags);
};


