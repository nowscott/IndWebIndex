//components/ThemeToggleButton.js
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

const ThemeToggleButton = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      title="切换主题"
      onClick={(e) => toggleTheme(e)}
      className="p-2 rounded-full hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-300 group hover:scale-110 active:scale-95"
    >
      <HiOutlineMoon aria-hidden="true" className="dark:hidden text-[#773d31] w-5 h-5 group-hover:-rotate-12 group-hover:text-orange-500 transition-all duration-500" />
      <HiOutlineSun aria-hidden="true" className="hidden dark:block text-zinc-300 w-5 h-5 group-hover:rotate-90 group-hover:text-white transition-all duration-500" />
    </button>
  );
};

export default ThemeToggleButton;
