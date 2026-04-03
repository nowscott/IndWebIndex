import React, { useState, useEffect } from 'react';
import packageInfo from '../package.json';
import { useStats } from '../contexts/StatsContext';
import { HiOutlineCursorClick, HiOutlineTag, HiOutlineCode, HiOutlineGlobeAlt, HiOutlineClock } from 'react-icons/hi';

// 数字滚动组件
const CountUp = ({ end, duration = 2000, isPending = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 如果是 pending 状态且没有 end 值，我们可以先滚到一个预估的小数值，或者保持 0
    // 这里我们选择让它在等待时缓慢滚到一个基础值，或者直接等待 end 出现
    if (typeof end !== 'number') return;
    
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // 使用 easeOutExpo 让动画更顺滑
      const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
      const currentCount = Math.floor(easeOutExpo(progress) * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  // 如果还在加载中，显示一个跳动的 0 或者骨架
  if (isPending && typeof end !== 'number') {
    return <span className='animate-pulse text-sky-600/50 dark:text-zinc-100/50'>0</span>;
  }

  return <span>{count.toLocaleString()}</span>;
};

const Footer = () => {
  const { stats } = useStats();

  return (
    <footer className='mt-auto px-4 pb-12 transition-colors duration-300 font-inherit'>
      <div className='max-w-[90rem] mx-auto'>
        <div className='px-6 sm:px-8'>
          <div className='h-[2px] rounded-full bg-sky-300 dark:bg-zinc-500/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'></div>
        </div>
        <div className='max-w-4xl mx-auto pt-12 flex flex-col items-center gap-6'>
        
        {/* 数据统计区 */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-[10px] sm:text-xs font-bold text-slate-700 dark:text-zinc-400">
          <div className="flex items-center gap-1.5 whitespace-nowrap bg-[linear-gradient(165deg,rgba(244,249,255,0.92),rgba(226,239,255,0.85))] dark:bg-[linear-gradient(165deg,rgba(43,43,47,0.9),rgba(28,28,30,0.95))] px-3 py-1 rounded-full border border-sky-300 dark:border-zinc-500/80 shadow-sm dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <HiOutlineGlobeAlt className="w-3.5 h-3.5 text-sky-500 dark:text-zinc-300" />
            <span>已收录 </span>
            <span className='inline-flex items-center justify-center min-w-[1.2rem]'>
              <span className="text-sky-600 dark:text-zinc-200 font-extrabold">
                <CountUp end={stats.count} duration={1000} isPending={stats.count === null} />
              </span>
            </span>
            <span> 个网站</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap bg-[linear-gradient(165deg,rgba(244,249,255,0.92),rgba(226,239,255,0.85))] dark:bg-[linear-gradient(165deg,rgba(43,43,47,0.9),rgba(28,28,30,0.95))] px-3 py-1 rounded-full border border-sky-300 dark:border-zinc-500/80 shadow-sm dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <HiOutlineClock className="w-3.5 h-3.5 text-sky-500 dark:text-zinc-300" />
            <span>数据更新时间：</span>
            <span className='inline-flex items-center min-w-[8.5rem]'>
              {stats.lastFetched ? (
                <span className="text-sky-600 dark:text-zinc-200 font-bold animate-in fade-in duration-700">
                  {new Date(stats.lastFetched).toLocaleString()}
                </span>
              ) : (
                <span className='h-2.5 w-24 bg-sky-200/50 dark:bg-zinc-700/50 rounded animate-pulse'></span>
              )}
            </span>
          </div>
        </div>

        {/* 顶部链接与功能区 */}
        <div className='flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm font-bold'>
          <a 
            href='https://nowscott.notion.site/134f941cf9b880e1b00ee5bdf55fd71d?pvs=105' 
            target='_blank' 
            rel='noopener noreferrer' 
            className='flex items-center gap-1.5 text-sky-500 dark:text-zinc-300 hover:text-sky-600 dark:hover:text-zinc-100 transition-colors'
          >
            <HiOutlineTag className='w-4 h-4' />
            <span>投稿网页</span>
          </a>
          
          <div className='flex items-center gap-1.5 text-sky-500 dark:text-zinc-300'>
            <HiOutlineCursorClick className='w-4 h-4' />
            <span className="whitespace-nowrap">访问量：</span>
            <span className='inline-flex items-center justify-start min-w-[3.8rem]'>
              <span className='text-sky-600 dark:text-zinc-100 font-extrabold'>
                <CountUp end={stats.visitCount} duration={1200} isPending={stats.visitCount === null} />
              </span>
            </span>
          </div>

          <div className='flex items-center gap-1.5 text-sky-500 dark:text-zinc-300'>
            <HiOutlineCode className='w-4 h-4' />
            <span>版本：<span className='text-sky-600 dark:text-zinc-100 font-extrabold'>v{packageInfo.version}</span></span>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className='text-xs text-slate-400 dark:text-slate-500 text-center space-y-1'>
          <p className='tracking-widest'>
            Copyright © 2021 - {new Date().getFullYear()} · NowScott
          </p>
          <p className='opacity-80 italic'>
            Your personal compass in the noisy internet
          </p>
        </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
