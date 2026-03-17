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
      className="p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-300 group hover:scale-110 active:scale-95"
    >
      {isDark ? (
        <HiOutlineSun className="text-zinc-300 w-5 h-5 group-hover:rotate-90 group-hover:text-white transition-all duration-500" />
      ) : (
        <HiOutlineMoon className="text-[#773d31] w-5 h-5 group-hover:-rotate-12 group-hover:text-orange-500 transition-all duration-500" />
      )}
    </button>
  );
};

export default ThemeToggleButton;