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

      // 同步移动端主题色
      const themeColor = document.querySelector('meta[name="theme-color"]');
      if (themeColor) {
        themeColor.content = isSystemDark ? '#000000' : '#f4f7fb';
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = (event) => {
    const toggle = (newTheme) => {
      document.documentElement.classList.toggle('dark', newTheme);
      
      // 同步 Favicon
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.href = newTheme ? '/images/favicon-dark.svg' : '/images/favicon-light.svg';
      }
      
      // 同步移动端主题色
      const themeColor = document.querySelector('meta[name="theme-color"]');
      if (themeColor) {
        themeColor.content = newTheme ? '#000000' : '#f4f7fb';
      }
    };

    if (!document.startViewTransition) {
      setIsDark(prev => {
        const next = !prev;
        toggle(next);
        return next;
      });
      return;
    }

    document.documentElement.classList.add('switching-theme');
    const transition = document.startViewTransition(() => {
      setIsDark(prev => {
        const next = !prev;
        toggle(next);
        return next;
      });
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove('switching-theme');
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
