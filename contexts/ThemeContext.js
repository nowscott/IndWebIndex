import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      const isSystemDark = e.matches;
      document.documentElement.classList.toggle('dark', isSystemDark);
      setIsDark(isSystemDark);
      
      // 同步 Favicon
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.href = isSystemDark ? '/images/favicon-dark.svg' : '/images/favicon-light.svg';
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDark(prevIsDark => {
      const newTheme = !prevIsDark;
      document.documentElement.classList.toggle('dark', newTheme);
      
      // 同步 Favicon
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.href = newTheme ? '/images/favicon-dark.svg' : '/images/favicon-light.svg';
      }
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);