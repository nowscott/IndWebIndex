import React, { useEffect, useState } from 'react';
import HeaderBar from './HeaderBar';
import Footer from './Footer';
import FontMenu from './FontMenu';
import Tags from './Tags';
import WebList from './WebList';
import { filterPostsBySearch, updateResults } from '../lib/dataLoader';
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
  const [filteredPosts, setFilteredPosts] = useState([]);

  // 初始化全局缓存
  useEffect(() => {
    if (initialPosts && initialPosts.length > 0 && !stats.posts) {
      updateStats({ posts: initialPosts, lastFetched: initialLastFetched, count: initialPosts.length });
    }
  }, [initialPosts]);

  // 当源数据 posts, 标签过滤 onList 或 搜索内容 searchQuery 变化时更新结果
  useEffect(() => {
    // 确保有数据时才进行过滤
    if (posts && posts.length > 0) {
      const results = updateResults(posts, onList);
      const finalResults = filterPostsBySearch(results, searchQuery);
      setFilteredPosts(finalResults);
    } else {
      setFilteredPosts([]);
    }
  }, [posts, onList, searchQuery]);

  const handleToggleTagButton = tag => {
    const newOnList = _.xor(onList, [tag]);
    setOnList(newOnList);
  };

  return (
    <div className='bg-[#fffbeb] dark:bg-[#051005] transition-colors duration-500 m-0 min-h-screen overflow-auto tracking-widest text-center flex flex-col font-inherit'>
      <HeaderBar 
        lastFetched={lastFetched} 
        count={filteredPosts.length} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <FontMenu />
      <main className="flex-1 pt-6">
        <Tags tags={tags} onList={onList} handleToggleTagButton={handleToggleTagButton} />
        <WebList filteredPosts={filteredPosts} />
      </main>
    </div>
  );
};

export default MainPage;