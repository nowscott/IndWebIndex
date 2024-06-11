import Head from 'next/head';
import { getDatabase } from '../lib/notion';
import { useEffect, useState } from 'react';
import {
  randomSort,
  unique,
  extractTags,
  filterPostsBySearch,
  toggleTagButton,
  updateResults,
} from '../lib/dataLoader';
import { initializeTheme } from '../lib/theme';
import { initializeContextMenu } from '../lib/contextMenu';

export default function Home({ initialPosts, lastFetched }) {
  const [posts, setPosts] = useState(initialPosts);
  const [normalPosts, setNormalPosts] = useState([]);
  const [hiddenPosts, setHiddenPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState([]);
  const [onList, setOnList] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  useEffect(() => {
    initializeTheme();
    initializeContextMenu();
    console.log(`数据更新时间: ${new Date(lastFetched).toLocaleString()}`);
    // 使用 setPosts 更新状态
    setPosts(initialPosts);
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
      <Head>
        <title>网站索引</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="探索IndWebIndex——您的个性化中文网站索引！我们提供一个简单且高效的方法，让您可以快速访问和管理您常用的网站。无论是学习资源、购物平台还是娱乐网站，您都可以一目了然。" />
      </Head>
      <div id="customContextMenu">
        <ul></ul>
      </div>
      <button id="darkbtn" className="daytime" title="切换模式">
        <img id="icon" src="/assets/svg/moon.svg" />
      </button>
      <div className="html-container">
        <h1 className="title-1">
          <a href="https://github.com/NowScott/IndWebIndex" target="_blank" rel="noopener noreferrer">
            Individual Web Index.
          </a>
        </h1>
        <h2 className="title-2">
          <a href="https://github.com/nowscott/IndWebIndex/blob/main/README.md" target="_blank" rel="noopener noreferrer">
            如何部署
          </a>
        </h2>
        <div className="search-box">
          <input className="search-in" id="s-in" type="text" placeholder="🔍请输入关键词" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <h2 className="title-tags">选择标签</h2>
        <div id="tags-container">
          {tags.map(tag => (
            <button
              key={tag}
              className={onList.includes(tag) ? 'tag on' : 'tag off'}
              onClick={() => handleToggleTagButton(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <h2 className="title-webs">筛选网页</h2>
        <div id="webs-container">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <a key={post.name} id="web" href={post.web} target="_blank" rel="noopener noreferrer" title={post.brief}>
                {post.name}
              </a>
            ))
          ) : (
            <p>未找到符合条件的网页</p>
          )}
        </div>
        <p className="footer-text">Copyright © 2021 - NowScott</p>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const databaseId = process.env.DATABASE_ID;
  const posts = await getDatabase(databaseId);
  // 获取数据的时间点
  const lastFetched = new Date().toISOString();
  // 排序和去重操作在服务器端执行，以确保一致性
  const sortedPosts = randomSort(unique(posts));
  return {
    props: {
      initialPosts: sortedPosts,
      lastFetched
    },
    revalidate: 1800, // 每30分钟重新生成静态页面
  };
}
