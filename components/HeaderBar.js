import React, { useEffect, useState } from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import { useTheme } from '../contexts/ThemeContext';

const HeaderBar = ({ lastFetched, count }) => {
  const { mounted } = useTheme();
  
  return (
    <div className="relative flex items-center py-2">
      <span className="text-xs text-gray-500 dark:text-gray-400 mx-auto">
        已收录 {count || 0} 个网站 | 数据更新时间：{mounted && lastFetched ? new Date(lastFetched).toLocaleString() : '加载中...'}
      </span>
      <div className="absolute right-4">
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default HeaderBar;