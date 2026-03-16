import React, { useEffect, useState } from 'react';
import Titles from './Titles';
import SearchBox from './SearchBox';
import Tags from './Tags';
import WebList from './WebList';
import Footer from './Footer';
import FontMenu from './FontMenu';
import HeaderBar from './HeaderBar';
import { filterPostsBySearch, updateResults } from '../lib/dataLoader';
import _ from 'lodash';

const MainPage = ({ initialPosts, initialTags, lastFetched }) => {
  const [posts, setPosts] = useState(initialPosts || []);
  const [normalPosts, setNormalPosts] = useState([]);
  const [hiddenPosts, setHiddenPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState(initialTags || []);
  const [onList, setOnList] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts || []);

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
      const filteredNormalPosts = initialPosts.filter(post => post.state !== '隐藏');
      const filteredHiddenPosts = initialPosts.filter(post => post.state === '隐藏');
      setNormalPosts(filteredNormalPosts);
      setHiddenPosts(filteredHiddenPosts);
    }
    if (initialTags) {
      setTags(initialTags);
    }
  }, [initialPosts, initialTags]);

  useEffect(() => {
    if (searchQuery === '隐藏') {
      setFilteredPosts(filterPostsBySearch(hiddenPosts, searchQuery));
    } else {
      setFilteredPosts(filterPostsBySearch(normalPosts, searchQuery));
    }
  }, [searchQuery, normalPosts, hiddenPosts]);

  useEffect(() => {
    updateResults(normalPosts, onList, setFilteredPosts, setTags, initialTags);
  }, [onList, normalPosts, initialTags]);

  const handleToggleTagButton = tag => {
    const newOnList = _.xor(onList, [tag]);
    setOnList(newOnList);
  };

  return (
    <div className='bg-stone-50 dark:bg-slate-900 backdrop-blur-[15px] m-0 min-h-screen overflow-auto tracking-widest text-center flex flex-col'>
      <HeaderBar lastFetched={lastFetched} />
      <FontMenu />
      <div className="flex-grow text-center mx-auto relative">
        <Titles />
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Tags tags={tags} onList={onList} handleToggleTagButton={handleToggleTagButton} />
        <WebList filteredPosts={filteredPosts} />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;