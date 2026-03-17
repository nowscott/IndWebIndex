import React, { useEffect, useMemo, useState } from 'react';
import HeaderBar from './HeaderBar';
import Footer from './Footer';
import FontMenu from './FontMenu';
import Tags from './Tags';
import WebList from './WebList';
import { extractTags, filterPostsBySearch, updateResults } from '../lib/dataLoader';
import { useStats } from '../contexts/StatsContext';
import _ from 'lodash';

const MainPage = ({ initialPosts, initialTags, lastFetched: initialLastFetched }) => {
  const { stats, updateStats } = useStats();
  
  // 优先使用全局缓存的数据，如果没有则使用初始 props
  const posts = stats.posts || initialPosts || [];
  const tags = initialTags || [];
  const lastFetched = stats.lastFetched || initialLastFetched;

  const [searchQuery, setSearchQuery] = useState('');
  const [onList, setOnList] = useState([]);

  // 初始化全局缓存
  useEffect(() => {
    if (initialPosts && initialPosts.length > 0 && !stats.posts) {
      updateStats({ posts: initialPosts, lastFetched: initialLastFetched, count: initialPosts.length });
    }
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    if (!posts || posts.length === 0) {
      return [];
    }
    const results = updateResults(posts, onList);
    return filterPostsBySearch(results, searchQuery);
  }, [posts, onList, searchQuery]);

  const visibleTags = useMemo(() => {
    if (!searchQuery.trim()) {
      return tags;
    }
    const availableTags = extractTags(filteredPosts);
    return tags.filter(tag => onList.includes(tag) || availableTags.includes(tag));
  }, [tags, onList, searchQuery, filteredPosts]);

  const handleToggleTagButton = tag => {
    const newOnList = _.xor(onList, [tag]);
    setOnList(newOnList);
  };

  return (
    <div className='app-background m-0 min-h-screen overflow-auto tracking-widest text-center flex flex-col font-inherit'>
      <HeaderBar 
        lastFetched={lastFetched} 
        count={filteredPosts.length} 
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
