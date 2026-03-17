//components/ThemeToggleButton.js
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

const ThemeToggleButton = () => {
  const { isDark, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="w-8 h-8" aria-hidden="true" />
    );
  }

  return (
    <button
      title={isDark ? "切换到亮色模式" : "切换到暗色模式"}
      onClick={(e) => toggleTheme(e)}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-400 group"
    >
      {isDark ? (
        <HiOutlineSun className="text-rose-400 w-5 h-5 group-hover:rotate-45 transition-transform duration-400" />
      ) : (
        <HiOutlineMoon className="text-blue-600 w-5 h-5 group-hover:-rotate-12 transition-transform duration-400" />
      )}
    </button>
  );
};

export default ThemeToggleButton;