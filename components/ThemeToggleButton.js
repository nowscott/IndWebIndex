//components/ThemeToggleButton.js
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

const ThemeToggleButton = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      title="切换模式"
      onClick={toggleTheme}
      className="border-none bg-transparent ml-[80vw] mt-[2vh]"
    >
      {isDark ? <HiOutlineSun className="text-rose-500 w-6 h-6" /> : <HiOutlineMoon className="text-blue-700 w-6 h-6" />}
    </button>
  );
};

export default ThemeToggleButton;