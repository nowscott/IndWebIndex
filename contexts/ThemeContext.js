import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const applyTheme = isDark => {
  document.documentElement.classList.toggle('dark', isDark);

  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = isDark ? '/images/favicon-dark.svg' : '/images/favicon-light.svg';
  }

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.content = isDark ? '#000000' : '#faf6ef';
  }
};

const getStoredTheme = () => {
  try {
    const storedTheme = window.localStorage.getItem('theme');
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
  } catch {
    return null;
  }
};

const storeTheme = isDark => {
  try {
    window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch {
    // Theme switching still works for the current page without persistence.
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = getStoredTheme();
    const darkMode = storedTheme ? storedTheme === 'dark' : mediaQuery.matches;

    setIsDark(darkMode);
    applyTheme(darkMode);
    setMounted(true);
    
    const handleChange = (e) => {
      if (getStoredTheme()) return;

      const isSystemDark = e.matches;
      applyTheme(isSystemDark);
      setIsDark(isSystemDark);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const toggle = (newTheme) => {
      storeTheme(newTheme);
      applyTheme(newTheme);
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
