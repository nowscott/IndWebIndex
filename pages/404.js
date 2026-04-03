import React, { useEffect } from 'react';
import HeaderBar from '../components/HeaderBar';
import FontMenu from '../components/FontMenu';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Head from 'next/head';
import Link from 'next/link';
import { useStats } from '../contexts/StatsContext';
import { getDatabase } from '../lib/notion';

const Custom404 = ({ count, lastFetched }) => {
  const { stats } = useStats();

  return (
    <div className='app-background m-0 min-h-screen overflow-auto tracking-widest flex flex-col font-inherit'>
      <Head>
        <title>404 - 页面未找到 | IndWebIndex</title>
      </Head>
      
      <HeaderBar lastFetched={lastFetched} count={count} />
      <FontMenu />

      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-24 text-center">
        {/* 404 状态 */}
        <div className="mb-8 sm:mb-12 relative">
          <div className="absolute inset-0 blur-3xl opacity-20 dark:opacity-40 bg-gradient-to-r from-orange-400 to-rose-500 rounded-full scale-150 animate-pulse"></div>
          <HiOutlineExclamationCircle className="w-24 h-24 sm:w-32 sm:h-32 text-orange-500/80 dark:text-orange-400/90 mx-auto relative z-10 drop-shadow-lg" />
        </div>

        {/* 提示文字 */}
        <div className="mb-10 sm:mb-16 relative z-10">
          <h1 className="text-6xl sm:text-9xl font-black tracking-tighter mb-4 sm:mb-6">
            <span className="inline-block px-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 dark:from-zinc-100 dark:to-zinc-500">
              404
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-zinc-200 mb-4">
            糟糕，你迷路了
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
            就像在漫无边际的互联网中寻找那个失落的网页，有时候我们会走错方向。这个页面似乎已经消失，或者从未存在过。
          </p>
        </div>

        {/* 返回按钮 */}
        <div className="relative z-10">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-10 py-3.5 rounded-full text-base sm:text-lg border border-slate-300/80 dark:border-zinc-500/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.92),rgba(236,245,255,0.88))] dark:bg-[linear-gradient(160deg,rgba(48,48,53,0.92),rgba(29,29,32,0.95))] text-slate-700 dark:text-zinc-100 font-bold hover:border-orange-400/50 dark:hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 shadow-md dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:shadow-xl hover:-translate-y-1 active:scale-95"
          >
            带我回首页
          </Link>
        </div>

        {/* 装饰性元素 */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 gap-4 opacity-40 dark:opacity-20 pointer-events-none">
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const databaseId = process.env.DATABASE_ID;
  const posts = await getDatabase(databaseId);
  const lastFetched = new Date().toISOString();
  
  // 404 页面只需提供元数据统计，不要同步 posts 列表到全局缓存，
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

export default Custom404;
