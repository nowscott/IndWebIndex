import React, { useEffect } from 'react';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';
import FontMenu from '../components/FontMenu';
import { HiOutlineSparkles, HiOutlineCollection, HiOutlineHeart } from 'react-icons/hi';
import Head from 'next/head';
import { getDatabase } from '../lib/notion';
import { unique } from '../lib/dataLoader';
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
    <div className='bg-[#fffbeb] dark:bg-[#051005] m-0 min-h-screen overflow-auto tracking-widest flex flex-col font-inherit'>
      <Head>
        <title>关于 - IndWebIndex</title>
      </Head>
      
      <HeaderBar lastFetched={lastFetched} count={count} />
      <FontMenu />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 sm:py-20 text-center">
        {/* 大标题 */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-500 dark:from-lime-200 dark:to-emerald-400">
              Individual Web Index
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-800 dark:text-slate-300 leading-relaxed italic">
            探索互联网的角落，发现那些有趣且独立的网页
          </p>
        </div>

        {/* 核心理念 */}
        <div className="grid sm:grid-cols-3 gap-6 mt-16 text-left">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#451a1a]/40 border border-slate-300 dark:border-[#5a1a1a] shadow-sm hover:border-orange-400/50 transition-[background-color,border-color]">
            <HiOutlineSparkles className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="text-lg font-extrabold mb-2 text-orange-600 dark:text-green-50">独立精神</h3>
            <p className="text-sm text-slate-700 dark:text-green-100/80 leading-relaxed">
              我们致力于发掘那些不随波逐流、充满个性和创意的独立个人网站，让互联网回归本心。
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#451a1a]/40 border border-slate-300 dark:border-[#5a1a1a] shadow-sm hover:border-blue-400/50 transition-[background-color,border-color]">
            <HiOutlineCollection className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-extrabold mb-2 text-indigo-600 dark:text-green-50">精心收录</h3>
            <p className="text-sm text-slate-700 dark:text-green-100/80 leading-relaxed">
              每一个被收录的网页都经过人工审核，确保其内容的质量和独特性，拒绝信息碎片。
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#451a1a]/40 border border-slate-300 dark:border-[#5a1a1a] shadow-sm hover:border-rose-400/50 transition-[background-color,border-color]">
            <HiOutlineHeart className="w-8 h-8 text-rose-500 mb-4" />
            <h3 className="text-lg font-extrabold mb-2 text-rose-600 dark:text-green-50">开源共建</h3>
            <p className="text-sm text-slate-700 dark:text-green-100/80 leading-relaxed">
              IndWebIndex 是一个完全开源的项目。任何人都可以通过提交 Issue 或投稿来丰富我们的索引库。
            </p>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="mt-16">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-slate-800 dark:bg-blue-500 text-white font-bold hover:opacity-90 transition-[background-color,transform,opacity] duration-300 shadow-lg active:scale-95"
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
