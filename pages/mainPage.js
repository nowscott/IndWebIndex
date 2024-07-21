// pages/mainPage.js
import { useEffect, useState } from 'react';
import CustomHead from '../components/CustomHead';
import ThemeToggleButton from '../components/ThemeToggleButton';
import Titles from '../components/Titles';
import SearchBox from '../components/SearchBox';
import Tags from '../components/Tags';
import WebList from '../components/WebList';
import Footer from '../components/Footer';
import { initializeTheme } from '../lib/theme';
import { initializeContextMenu } from '../lib/contextMenu';
import { randomSort, extractTags, filterPostsBySearch, toggleTagButton, updateResults } from '../lib/dataLoader';

const MainPage = ({ initialPosts, lastFetched }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [normalPosts, setNormalPosts] = useState([]);
  const [hiddenPosts, setHiddenPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState([]);
  const [onList, setOnList] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    initializeTheme();
    initializeContextMenu();
    console.log(`数据更新时间: ${new Date(lastFetched).toLocaleString()}`);
    setPosts(initialPosts);

    fetch('/api/visit-count')
      .then(response => response.json())
      .then(data => {
        if (data.count) {
          console.log(`本页面已被访问 ${data.count} 次`);
          setVisitCount(data.count);
        } else {
          console.log('访问计数数据不可用:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching visit count:', error);
      });

  }, [initialPosts, lastFetched]);

  useEffect(() => {
    const filteredNormalPosts = initialPosts.filter(post => post.state !== '隐藏');
    const filteredHiddenPosts = initialPosts.filter(post => post.state === '隐藏');
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
    <div>
      <CustomHead />
      <div id="customContextMenu">
        <ul></ul>
      </div>
      <ThemeToggleButton />
      <div className="html-container">
        <Titles />
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Tags tags={tags} onList={onList} handleToggleTagButton={handleToggleTagButton} />
        <WebList filteredPosts={filteredPosts} />
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;