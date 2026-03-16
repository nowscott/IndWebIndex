// pages/index.js
import { getDatabase } from '../lib/notion';
import { randomSort, unique, extractTags } from '../lib/dataLoader'
import MainPage from '../components/MainPage';

export default function Home({ initialPosts, initialTags, lastFetched }) {
  return <MainPage initialPosts={initialPosts} initialTags={initialTags} lastFetched={lastFetched} />;
}

export async function getStaticProps() {
  const databaseId = process.env.DATABASE_ID;
  const posts = await getDatabase(databaseId);
  const lastFetched = new Date().toISOString();
  
  // 只有在数据存在时才进行耗时操作
  const sortedPosts = posts ? randomSort(unique(posts)) : [];
  const normalPosts = sortedPosts.filter(post => post.state !== '隐藏');
  const initialTags = randomSort(extractTags(normalPosts));

  return {
    props: {
      initialPosts: sortedPosts,
      initialTags: initialTags,
      lastFetched
    },
    revalidate: 1800,
  };
}