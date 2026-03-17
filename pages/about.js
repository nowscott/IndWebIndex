import React, { useEffect } from 'react';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';
import FontMenu from '../components/FontMenu';
import { HiOutlineSparkles, HiOutlineCollection, HiOutlineHeart } from 'react-icons/hi';
import Head from 'next/head';
import { getDatabase } from '../lib/notion';
import Link from 'next/link';
import { useStats } from '../contexts/StatsContext';

const AboutPage = ({ count, lastFetched, posts }) => {
  const { stats, updateStats } = useStats();

  // 初始化全局缓存，如果从关于页直接进入，也要填充数据
  useEffect(() => {
    if (posts && !stats.posts) {
      updateStats({ posts, lastFetched, count });
    }
  }, [posts]);

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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 dark:from-zinc-100 dark:to-zinc-500">
              Individual Web Index
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            探索互联网的角落，发现那些有趣且独立的网页
          </p>
        </div>

        {/* 核心理念 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mt-6 sm:mt-16 text-left">
          <div className="flex sm:block items-start p-4 sm:p-6 rounded-2xl bg-[linear-gradient(165deg,rgba(255,255,255,0.94),rgba(241,248,255,0.9))] dark:bg-[linear-gradient(165deg,rgba(42,42,46,0.92),rgba(28,28,30,0.95))] border border-slate-300 dark:border-zinc-700/90 shadow-sm hover:border-sky-400/50 transition-[background-color,border-color]">
            <HiOutlineSparkles className="w-8 h-8 text-sky-500 shrink-0 mr-4 sm:mr-0 sm:mb-4" />
            <div>
              <h3 className="text-base sm:text-lg font-extrabold mb-1 sm:mb-2 text-sky-600 dark:text-zinc-100">独立精神</h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                我们致力于发掘那些不随波逐流、充满个性和创意的独立个人网站，让互联网回归本心。
              </p>
            </div>
          </div>
          <div className="flex sm:block items-start p-4 sm:p-6 rounded-2xl bg-[linear-gradient(165deg,rgba(255,255,255,0.94),rgba(241,248,255,0.9))] dark:bg-[linear-gradient(165deg,rgba(42,42,46,0.92),rgba(28,28,30,0.95))] border border-slate-300 dark:border-zinc-700/90 shadow-sm hover:border-blue-400/50 transition-[background-color,border-color]">
            <HiOutlineCollection className="w-8 h-8 text-blue-500 shrink-0 mr-4 sm:mr-0 sm:mb-4" />
            <div>
              <h3 className="text-base sm:text-lg font-extrabold mb-1 sm:mb-2 text-indigo-600 dark:text-zinc-100">精心收录</h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                每一个被收录的网页都经过人工审核，确保其内容的质量和独特性，拒绝信息碎片。
              </p>
            </div>
          </div>
          <div className="flex sm:block items-start p-4 sm:p-6 rounded-2xl bg-[linear-gradient(165deg,rgba(255,255,255,0.94),rgba(241,248,255,0.9))] dark:bg-[linear-gradient(165deg,rgba(42,42,46,0.92),rgba(28,28,30,0.95))] border border-slate-300 dark:border-zinc-700/90 shadow-sm hover:border-cyan-400/50 transition-[background-color,border-color]">
            <HiOutlineHeart className="w-8 h-8 text-cyan-500 shrink-0 mr-4 sm:mr-0 sm:mb-4" />
            <div>
              <h3 className="text-base sm:text-lg font-extrabold mb-1 sm:mb-2 text-cyan-600 dark:text-zinc-100">开源共建</h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                IndWebIndex 是一个完全开源的项目。任何人都可以通过提交 Issue 或投稿来丰富我们的索引库。
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
  
  // 过滤掉隐藏的
  const normalPosts = (posts || []).filter(post => post.state !== '隐藏');
  const count = normalPosts.length;

  return {
    props: {
      count,
      lastFetched,
      posts: posts || []
    },
    revalidate: 1800,
  };
}

export default AboutPage;
