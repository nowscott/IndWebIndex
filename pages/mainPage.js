import React, { useEffect, useState } from 'react';
import Titles from '../components/Titles';
import SearchBox from '../components/SearchBox';
import Tags from '../components/Tags';
import WebList from '../components/WebList';
import Footer from '../components/Footer';
import FontMenu from '../components/FontMenu';
import HeaderBar from '../components/HeaderBar';
import { randomSort, extractTags, filterPostsBySearch, toggleTagButton, updateResults } from '../lib/dataLoader';

const MainPage = ({ initialPosts, lastFetched }) => {
  const [posts, setPosts] = useState(initialPosts || []);
  const [normalPosts, setNormalPosts] = useState([]);
  const [hiddenPosts, setHiddenPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState([]);
  const [onList, setOnList] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts || []);

  useEffect(() => {
    setPosts(initialPosts || []);
  }, [initialPosts]);

  useEffect(() => {
    const filteredNormalPosts = (initialPosts || []).filter(post => post.state !== '隐藏');
    const filteredHiddenPosts = (initialPosts || []).filter(post => post.state === '隐藏');
    setNormalPosts(filteredNormalPosts);
    setHiddenPosts(filteredHiddenPosts);
  }, [initialPosts]);

  useEffect(() => {
    const extractedTags = randomSort(extractTags(normalPosts));
    setTags(extractedTags);
  }, [normalPosts]);

  useEffect(() => {
    if (searchQuery === '隐藏') {
      setFilteredPosts(filterPostsBySearch(hiddenPosts, searchQuery));
    } else {
      setFilteredPosts(filterPostsBySearch(normalPosts, searchQuery));
    }
  }, [searchQuery, normalPosts, hiddenPosts]);

  useEffect(() => {
    updateResults(normalPosts, onList, setFilteredPosts, setTags);
  }, [onList]);

  const handleToggleTagButton = tag => {
    toggleTagButton(tag, onList, setOnList, tags, setTags);
  };

  return (
    <div className='bg-stone-50 dark:bg-slate-800 backdrop-blur-[15px] m-0 min-h-screen overflow-auto tracking-widest text-center flex flex-col'>
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