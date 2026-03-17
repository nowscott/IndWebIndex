import React, { useEffect } from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import { useStats } from '../contexts/StatsContext';
import { HiOutlineInformationCircle, HiOutlineHome, HiOutlineSearch } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HeaderBar = ({ lastFetched, count, searchQuery, setSearchQuery }) => {
  const { updateStats } = useStats();
  const router = useRouter();
  const isAboutPage = router.pathname === '/about';

  // 同步 props 到全局 stats (仅在 count 有意义时同步)
  useEffect(() => {
    if (count !== undefined && count !== null && count > 0) {
      updateStats({ count, lastFetched });
    }
  }, [count, lastFetched]);

  return (
    <header className="sticky top-0 z-40 w-full bg-black/[0.04] dark:bg-black/20 transition-[background-color,border-color,box-shadow] duration-400">
      <div className="max-w-[90rem] mx-auto px-4 h-14 flex items-center relative">
        
        {/* 左侧入口 */}
        <div className="flex-1 sm:flex-none w-10 z-10 flex items-center">
          <Link 
            href={isAboutPage ? "/" : "/about"} 
            title={isAboutPage ? "返回首页" : "关于项目"}
            className="group p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/10 text-[#773d31] dark:text-slate-300 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            {isAboutPage ? (
              <HiOutlineHome className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:text-orange-500 dark:group-hover:text-white transition-all duration-300" />
            ) : (
              <HiOutlineInformationCircle className="w-5 h-5 group-hover:rotate-12 group-hover:text-orange-500 dark:group-hover:text-white transition-all duration-300" />
            )}
          </Link>
        </div>

        {/* 中间检索框 (绝对居中) */}
        {!isAboutPage && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[14rem] xs:max-w-sm sm:max-w-md px-3 z-20">
            <div className="relative group w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#773d31] dark:text-zinc-100 transition-colors">
                <HiOutlineSearch className="w-4 h-4" />
              </div>
              <input
                className="
                w-full pl-9 pr-4 py-1.5
                text-xs sm:text-sm
                tracking-normal
                text-[#773d31] dark:text-zinc-100
                bg-[linear-gradient(160deg,rgba(243,248,255,0.92),rgba(225,238,255,0.82))] dark:bg-[linear-gradient(160deg,rgba(45,45,50,0.86),rgba(28,28,30,0.9))]
                border border-sky-300 dark:border-zinc-500/80
                rounded-full shadow-sm focus:shadow-md
                focus:outline-none focus:ring-orange-500/20 dark:focus:ring-zinc-200/15
                transition-[background-color,border-color,color,box-shadow] duration-400 placeholder:text-[#a36b5f] placeholder:tracking-normal dark:placeholder:text-zinc-400 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)] dark:focus:shadow-[0_0_0_1px_rgba(255,255,255,0.22)]"
                type="text"
                placeholder="搜索网页、标签或拼音..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* 右侧功能 */}
        <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2 z-10">
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
