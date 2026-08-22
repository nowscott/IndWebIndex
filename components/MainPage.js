import React, { useMemo, useState } from 'react';
import HeaderBar from './HeaderBar';
import FontMenu from './FontMenu';
import Tags from './Tags';
import WebList from './WebList';
import {
  extractTags,
  filterPostsBySearch,
  preparePostsForSearch,
  updateResults,
} from '../lib/dataLoader';

const MainPage = ({ initialPosts, initialTags, lastFetched: initialLastFetched }) => {
  // Page props are the source of truth so a newer ISR payload is never hidden
  // behind stale client-side data from an earlier navigation.
  const posts = initialPosts || [];
  const tags = initialTags || [];
  const lastFetched = initialLastFetched;

  const [searchQuery, setSearchQuery] = useState('');
  const [onList, setOnList] = useState([]);

  const searchablePosts = useMemo(() => preparePostsForSearch(posts), [posts]);

  const filteredPosts = useMemo(() => {
    if (!posts || posts.length === 0) {
      return [];
    }
    const results = updateResults(searchablePosts, onList);
    return filterPostsBySearch(results, searchQuery);
  }, [searchablePosts, onList, searchQuery]);

  // 计算总的可见网页数量（排除隐藏网页），用于显示
  const totalVisibleCount = useMemo(() => {
    return posts.filter(p => p.state !== '隐藏').length;
  }, [posts]);

  const visibleTags = useMemo(() => {
    if (!searchQuery.trim()) {
      return tags;
    }
    const availableTags = extractTags(filteredPosts);
    const tagsToShow = new Set([...onList, ...availableTags]);
    
    // 优先按照 initialTags 的顺序显示，额外的标签放在后面
    const sortedVisibleTags = tags.filter(t => tagsToShow.has(t));
    const extraTags = [...tagsToShow].filter(t => !tags.includes(t));
    
    return [...sortedVisibleTags, ...extraTags];
  }, [tags, onList, searchQuery, filteredPosts]);

  const handleToggleTagButton = tag => setOnList(current => (
    current.includes(tag)
      ? current.filter(item => item !== tag)
      : [...current, tag]
  ));

  return (
    <div className='home-page m-0 min-h-screen overflow-auto tracking-widest text-center flex flex-col font-inherit'>
      <HeaderBar 
        lastFetched={lastFetched} 
        count={totalVisibleCount} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <FontMenu />
      <main className="flex-1 pt-6">
        <Tags
          tags={visibleTags}
          onList={onList}
          handleToggleTagButton={handleToggleTagButton}
          emptyHint={searchQuery.trim() ? '未找到符合条件的标签' : '暂无可用标签'}
        />
        <WebList filteredPosts={filteredPosts} />
      </main>
    </div>
  );
};

export default MainPage;
