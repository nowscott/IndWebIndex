import React from 'react';
import ThemeToggleButton from './ThemeToggleButton';

const HeaderBar = ({ lastFetched }) => {
  return (
    <div className="relative flex items-center py-2">
      <span className="text-xs text-gray-500 dark:text-gray-400 mx-auto">
        数据更新时间：{lastFetched ? new Date(lastFetched).toLocaleString() : '加载中...'}
      </span>
      <div className="absolute right-4">
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default HeaderBar;