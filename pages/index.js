// pages/index.js
import { getDatabase } from '../lib/notion';
import { randomSort,unique } from '../lib/dataLoader'
import MainPage from './mainPage';

export default function Home({ initialPosts, lastFetched }) {
  return <MainPage initialPosts={initialPosts} lastFetched={lastFetched} />;
}

export async function getStaticProps() {
  const databaseId = process.env.DATABASE_ID;
  const posts = await getDatabase(databaseId);
  const lastFetched = new Date().toISOString();
  const sortedPosts = randomSort(unique(posts));
  return {
    props: {
      initialPosts: sortedPosts,
      lastFetched
    },
    revalidate: 1800,
  };
}