import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  THEME_STORAGE_KEY,
  getNextThemePreference,
  resolveThemePreference,
} from '../lib/theme';

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
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
  } catch {
    return null;
  }
};

const setStoredTheme = theme => {
  try {
    if (theme) {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } else {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    }
  } catch {
    // Theme switching still works for the current page without persistence.
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const preference = resolveThemePreference({
      storedTheme: getStoredTheme(),
      systemDark: mediaQuery.matches,
    });

    if (preference.shouldClearStoredTheme) {
      setStoredTheme(null);
    }
    setIsDark(preference.isDark);
    applyTheme(preference.isDark);
    setMounted(true);
    
    const handleChange = (e) => {
      const nextPreference = resolveThemePreference({
        storedTheme: getStoredTheme(),
        systemDark: e.matches,
      });

      if (nextPreference.shouldClearStoredTheme) {
        setStoredTheme(null);
      }
      applyTheme(nextPreference.isDark);
      setIsDark(nextPreference.isDark);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const nextPreference = getNextThemePreference({
      currentDark: isDark,
      systemDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
    });
    const applyNextTheme = () => {
      setStoredTheme(nextPreference.storedTheme);
      applyTheme(nextPreference.isDark);
      setIsDark(nextPreference.isDark);
    };

    if (!document.startViewTransition) {
      applyNextTheme();
      return;
    }

    document.documentElement.classList.add('switching-theme');
    const transition = document.startViewTransition(applyNextTheme);

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
