import React, { useEffect } from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import { useTheme } from '../contexts/ThemeContext';
import { useStats } from '../contexts/StatsContext';
import { HiOutlineClock, HiOutlineGlobeAlt, HiOutlineInformationCircle, HiOutlineHome, HiOutlineSearch } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HeaderBar = ({ lastFetched, count, searchQuery, setSearchQuery }) => {
  const { mounted } = useTheme();
  const { stats, updateStats } = useStats();
  const router = useRouter();
  const isAboutPage = router.pathname === '/about';

  // 同步 props 到全局 stats (仅在 count 有意义时同步)
  useEffect(() => {
    if (count !== undefined && count !== null && count > 0) {
      updateStats({ count, lastFetched });
    }
  }, [count, lastFetched]);

  // 优先使用全局 stats，如果没有则回退到 props
  const displayCount = stats.count ?? count;
  const displayTime = stats.lastFetched ?? lastFetched;
  
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-orange-50/70 dark:bg-[#051005]/70 border-b border-orange-100 dark:border-green-900/30 transition-[background-color,border-color] duration-400">
      <div className="max-w-[90rem] mx-auto px-4 h-14 flex items-center relative">
        
        {/* 左侧占位 (保持对称) */}
        <div className="flex-1 sm:flex-none w-10"></div>

        {/* 中间检索框 (绝对居中) */}
        {!isAboutPage && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[12rem] xs:max-w-xs sm:max-w-md px-4 z-20">
            <div className="relative group w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-orange-400 dark:text-green-50/60 group-focus-within:text-orange-600 dark:group-focus-within:text-green-400 transition-colors">
                <HiOutlineSearch className="w-4 h-4" />
              </div>
              <input
                className="
                w-full pl-9 pr-4 py-1.5
                text-xs sm:text-sm
                text-orange-700 dark:text-green-50
                bg-sky-50/50 dark:bg-[#451a1a]/80
                border border-sky-200 dark:border-[#5a1a1a]
                rounded-full shadow-sm focus:shadow-md
                focus:outline-none focus:ring-orange-500/20 dark:focus:ring-rose-500/20
                transition-[background-color,border-color,color] duration-400 placeholder:text-orange-300 dark:placeholder:text-rose-300/40"
                type="text"
                placeholder="搜索网页或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* 右侧功能 */}
        <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2 z-10">
          <Link 
            href={isAboutPage ? "/" : "/about"} 
            title={isAboutPage ? "返回首页" : "关于项目"}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            {isAboutPage ? (
              <HiOutlineHome className="w-5 h-5" />
            ) : (
              <HiOutlineInformationCircle className="w-5 h-5" />
            )}
          </Link>
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;