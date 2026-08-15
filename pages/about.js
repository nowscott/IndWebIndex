import React from 'react';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';
import FontMenu from '../components/FontMenu';
import { HiOutlineSparkles, HiOutlineCollection, HiOutlineHeart } from 'react-icons/hi';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { getDatabase } from '../lib/notion';
import Link from 'next/link';
import { useStats } from '../contexts/StatsContext';

const VisitActivity = dynamic(() => import('../components/VisitActivity'), { ssr: false });

const AboutPage = ({ count, lastFetched }) => {
  const { stats } = useStats();

  return (
    <div className='about-page m-0 min-h-screen overflow-auto tracking-widest flex flex-col font-inherit'>
      <Head>
        <title>关于 - IndWebIndex</title>
      </Head>
      
      <HeaderBar lastFetched={lastFetched} count={count} />
      <FontMenu />

      <main className="about-shell flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-20 text-center">
        <section className="about-glass-hero">
          <div className="about-glass-content">
            <p className="about-kicker">INDWEBINDEX · ABOUT</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mt-4 mb-4 sm:mb-6">
              <span className="inline-block px-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 dark:from-sky-100 dark:via-blue-200 dark:to-indigo-300">
                Individual Web Index
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              互联网时代的个人黄页，让寻找回归准确与高效
            </p>

            {stats.visitCount !== undefined && (
              <VisitActivity activity={stats.visitActivity} />
            )}

            <Link
              href="/"
              className="about-glass-button inline-flex items-center justify-center mt-8 sm:mt-10 px-8 py-3 rounded-full text-base sm:text-lg font-bold"
            >
              开始探索
            </Link>
          </div>
        </section>

        <section className="mt-8 sm:mt-12" aria-labelledby="about-values-title">
          <p className="about-kicker mb-3">WHAT GUIDES THIS INDEX</p>
          <h2 id="about-values-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-zinc-100">为个人留下清晰入口</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mt-6 sm:mt-8 text-left">
            <div className="about-value-card flex sm:block items-start p-4 sm:p-6 rounded-2xl">
              <HiOutlineSparkles className="w-8 h-8 text-sky-500 shrink-0 mr-4 sm:mr-0 sm:mb-4" />
              <div>
                <h3 className="text-base sm:text-lg font-extrabold mb-1 sm:mb-2 text-sky-700 dark:text-sky-100">个人黄页</h3>
                <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  像互联网初期的黄页一样，构建属于你自己的索引。不再迷失于搜索引擎的广告与杂讯中，只保留最精准、最常用的入口。
                </p>
              </div>
            </div>
            <div className="about-value-card flex sm:block items-start p-4 sm:p-6 rounded-2xl">
              <HiOutlineCollection className="w-8 h-8 text-blue-500 shrink-0 mr-4 sm:mr-0 sm:mb-4" />
              <div>
                <h3 className="text-base sm:text-lg font-extrabold mb-1 sm:mb-2 text-blue-700 dark:text-blue-100">专属定制</h3>
                <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  告别繁杂的默认书签，将你珍视的网站转化为可视化的专属卡片。通过灵活的分类和描述，让每一次信息查找都井然有序，成为你的数字资产。
                </p>
              </div>
            </div>
            <div className="about-value-card flex sm:block items-start p-4 sm:p-6 rounded-2xl">
              <HiOutlineHeart className="w-8 h-8 text-cyan-500 shrink-0 mr-4 sm:mr-0 sm:mb-4" />
              <div>
                <h3 className="text-base sm:text-lg font-extrabold mb-1 sm:mb-2 text-cyan-700 dark:text-cyan-100">纯粹体验</h3>
                <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  抛开一切干扰，回归浏览网页最纯粹的乐趣。简约的设计与顺滑的交互，让你在属于自己的数字世界中自由穿梭，发现每一个有价值的角落。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const databaseId = process.env.DATABASE_ID;
  const posts = await getDatabase(databaseId);
  const lastFetched = new Date().toISOString();
  
  // 关于页只需提供元数据统计，不要同步 posts 列表到全局缓存，
  // 这样能确保跳回首页时，首页使用的是其自身半小时内稳定的随机排序数据。
  const normalPosts = (posts || []).filter(post => post.state !== '隐藏');
  const count = normalPosts.length;

  return {
    props: {
      count,
      lastFetched
    },
    revalidate: 1800,
  };
}

export default AboutPage;
