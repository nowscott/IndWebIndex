import React, { useState, useEffect } from 'react';
import packageInfo from '../package.json';
import { useStats } from '../contexts/StatsContext';
import { HiOutlineCursorClick, HiOutlineTag, HiOutlineCode, HiOutlineGlobeAlt, HiOutlineClock } from 'react-icons/hi';

const Footer = () => {
  const { stats, updateStats } = useStats();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 如果已经有缓存的访问量，不再重复请求
    if (stats.visitCount !== null) return;

    const fetchVisitCount = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/visit-count');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        updateStats({ visitCount: data.count });
      } catch (error) {
        console.error('获取访问量失败：', error);
        updateStats({ visitCount: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchVisitCount();
  }, [stats.visitCount]);

  return (
    <footer className='mt-auto py-12 px-4 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300 font-inherit'>
      <div className='max-w-4xl mx-auto flex flex-col items-center gap-6'>
        
        {/* 数据统计区 (新增) */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-[10px] sm:text-xs font-bold text-slate-700 dark:text-green-100/80">
          <div className="flex items-center gap-1.5 whitespace-nowrap bg-amber-50/50 dark:bg-[#451a1a]/60 px-3 py-1 rounded-full border border-amber-200 dark:border-[#5a1a1a] shadow-sm">
            <HiOutlineGlobeAlt className="w-3.5 h-3.5 text-orange-500 dark:text-green-400" />
            <span>已收录 <span className="text-orange-600 dark:text-green-300 font-extrabold">{stats.count || 0}</span> 个网站</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap bg-amber-50/50 dark:bg-[#451a1a]/60 px-3 py-1 rounded-full border border-amber-200 dark:border-[#5a1a1a] shadow-sm">
            <HiOutlineClock className="w-3.5 h-3.5 text-orange-500 dark:text-green-400" />
            <span>数据更新时间：<span className="text-orange-600 dark:text-green-200 font-bold">{stats.lastFetched ? new Date(stats.lastFetched).toLocaleString() : '...'}</span></span>
          </div>
        </div>

        {/* 顶部链接与功能区 */}
        <div className='flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm font-bold'>
          <a 
            href='https://nowscott.notion.site/134f941cf9b880e1b00ee5bdf55fd71d?pvs=105' 
            target='_blank' 
            rel='noopener noreferrer' 
            className='flex items-center gap-1.5 text-orange-500 dark:text-green-200 hover:text-orange-600 dark:hover:text-white transition-colors'
          >
            <HiOutlineTag className='w-4 h-4' />
            <span>投稿网页</span>
          </a>
          
          <div className='flex items-center gap-1.5 text-orange-500 dark:text-green-200'>
            <HiOutlineCursorClick className='w-4 h-4' />
            <span>
              访问量：{stats.visitCount !== null ? <span className='text-orange-600 dark:text-green-300 font-extrabold'>{stats.visitCount}</span> : '...'}
            </span>
          </div>

          <div className='flex items-center gap-1.5 text-slate-700 dark:text-slate-400'>
            <HiOutlineCode className='w-4 h-4' />
            <span>v{packageInfo.version}</span>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className='text-xs text-slate-400 dark:text-slate-500 text-center space-y-1'>
          <p className='tracking-widest uppercase'>
            Copyright © 2021 - {new Date().getFullYear()} · NowScott
          </p>
          <p className='opacity-80 italic'>
            Crafted with passion for the independent web
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;