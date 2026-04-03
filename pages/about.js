import React, { useEffect } from 'react';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';
import FontMenu from '../components/FontMenu';
import { HiOutlineSparkles, HiOutlineCollection, HiOutlineHeart } from 'react-icons/hi';
import Head from 'next/head';
import { getDatabase } from '../lib/notion';
import Link from 'next/link';
import { useStats } from '../contexts/StatsContext';

const AboutPage = ({ count, lastFetched }) => {
  const { stats } = useStats();

  return (
    <div className='app-background m-0 min-h-screen overflow-auto tracking-widest flex flex-col font-inherit'>
      <Head>
        <title>关于 - IndWebIndex</title>
      </Head>
      
      <HeaderBar lastFetched={lastFetched} count={count} />
      <FontMenu />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-20 text-center">
        {/* 大标题 */}
        <div className="mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            <span className="inline-block px-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 dark:from-zinc-100 dark:to-zinc-500">
              Individual Web Index
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            互联网时代的个人黄页，让寻找回归准确与高效
          </p>
        </div>

        {/* 核心理念 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mt-6 sm:mt-16 text-left">
          <div className="flex sm:block items-start p-4 sm:p-6 rounded-2xl bg-[linear-gradient(165deg,rgba(255,255,255,0.94),rgba(241,248,255,0.9))] dark:bg-[linear-gradient(165deg,rgba(42,42,46,0.92),rgba(28,28,30,0.95))] border border-slate-300 dark:border-zinc-700/90 shadow-sm hover:border-sky-400/50 transition-[background-color,border-color]">
            <HiOutlineSparkles className="w-8 h-8 text-sky-500 shrink-0 mr-4 sm:mr-0 sm:mb-4" />
            <div>
              <h3 className="text-base sm:text-lg font-extrabold mb-1 sm:mb-2 text-sky-600 dark:text-zinc-100">个人黄页</h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                像互联网初期的黄页一样，构建属于你自己的索引。不再迷失于搜索引擎的广告与杂讯中，只保留最精准、最常用的入口。
              </p>
            </div>
          </div>
          <div className="flex sm:block items-start p-4 sm:p-6 rounded-2xl bg-[linear-gradient(165deg,rgba(255,255,255,0.94),rgba(241,248,255,0.9))] dark:bg-[linear-gradient(165deg,rgba(42,42,46,0.92),rgba(28,28,30,0.95))] border border-slate-300 dark:border-zinc-700/90 shadow-sm hover:border-blue-400/50 transition-[background-color,border-color]">
            <HiOutlineCollection className="w-8 h-8 text-blue-500 shrink-0 mr-4 sm:mr-0 sm:mb-4" />
            <div>
              <h3 className="text-base sm:text-lg font-extrabold mb-1 sm:mb-2 text-indigo-600 dark:text-zinc-100">专属定制</h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                告别繁杂的默认书签，将你珍视的网站转化为可视化的专属卡片。通过灵活的分类和描述，让每一次信息查找都井然有序，成为你的数字资产。
              </p>
            </div>
          </div>
          <div className="flex sm:block items-start p-4 sm:p-6 rounded-2xl bg-[linear-gradient(165deg,rgba(255,255,255,0.94),rgba(241,248,255,0.9))] dark:bg-[linear-gradient(165deg,rgba(42,42,46,0.92),rgba(28,28,30,0.95))] border border-slate-300 dark:border-zinc-700/90 shadow-sm hover:border-cyan-400/50 transition-[background-color,border-color]">
            <HiOutlineHeart className="w-8 h-8 text-cyan-500 shrink-0 mr-4 sm:mr-0 sm:mb-4" />
            <div>
              <h3 className="text-base sm:text-lg font-extrabold mb-1 sm:mb-2 text-cyan-600 dark:text-zinc-100">纯粹体验</h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                抛开一切干扰，回归浏览网页最纯粹的乐趣。简约的设计与顺滑的交互，让你在属于自己的数字世界中自由穿梭，发现每一个有价值的角落。
              </p>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="mt-10 sm:mt-16">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full text-base sm:text-lg border border-slate-300/80 dark:border-zinc-500/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.92),rgba(236,245,255,0.88))] dark:bg-[linear-gradient(160deg,rgba(48,48,53,0.92),rgba(29,29,32,0.95))] text-slate-700 dark:text-zinc-100 font-bold hover:border-sky-400/50 dark:hover:border-zinc-300 transition-[background-color,border-color,color,transform,box-shadow] duration-300 shadow-md dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:shadow-lg active:scale-95"
          >
            开始探索
          </Link>
        </div>
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
